import pandas as pd
import numpy as np
import threading
from datetime import datetime
from sklearn.model_selection import train_test_split
from catboost import CatBoostRegressor
from apscheduler.schedulers.background import BackgroundScheduler

# =========================
# GLOBAL STATE
# =========================

model = None
problem_lookup = {}
global_mean_service_time = 20.0
last_training_time = None

model_lock = threading.Lock()
training_lock = threading.Lock()  # prevents overlapping training

# =========================
# HELPERS
# =========================

def clean_basic(s):
    if pd.isna(s):
        return "missing"
    s = str(s).strip().lower()
    if 'follow' in s:
        return 'followup'
    if 'new' in s:
        return 'new'
    if s in ['true', 'yes', '1']:
        return 'emergency'
    if s in ['false', 'no', '0']:
        return 'normal'
    return s


def convert_time_to_min(t):
    try:
        t = str(t).upper().replace(' ', '')
        dt = pd.to_datetime(t)
        return dt.hour * 60 + dt.minute
    except Exception:
        return 540  # default = 9:00 AM


# =========================
# TRAINING FUNCTION
# =========================

def train_model():
    global model, problem_lookup, global_mean_service_time, last_training_time

    # Prevent overlapping runs
    if not training_lock.acquire(blocking=False):
        #print(f"[{datetime.now()}] Training skipped (already running)")
        return

    #print(f"[{datetime.now()}] Training started")

    try:
        df = pd.read_csv("dataset.csv")

        df.columns = df.columns.str.strip().str.lower()

        required_cols = [
            'doctor_id', 'doctor_type', 'clinic_type',
            'visit_type', 'day', 'emergency', 'gender',
            'problem', 'age', 'token_no', 'time', 'service_time'
        ]
        df = df.dropna(subset=required_cols)

        for col in ['doctor_id', 'doctor_type', 'clinic_type',
                    'visit_type', 'day', 'emergency', 'gender', 'problem']:
            df[col] = df[col].apply(clean_basic)

        df['service_time'] = pd.to_numeric(df['service_time'], errors='coerce')
        df = df[df['service_time'] > 0]

        df['time_min'] = df['time'].apply(convert_time_to_min)

        # Priority signal 
        df['priority_chain'] = (
            df['emergency'] + "_" +
            df['doctor_id'] + "_" +
            df['doctor_type'] + "_" +
            df['visit_type']
        )

        local_problem_lookup = (
            df.groupby('problem')['service_time']
            .mean()
            .to_dict()
        )

        df['problem_complexity'] = df['problem'].map(local_problem_lookup)
        local_global_mean = df['service_time'].mean()

        features = [
            'emergency', 'priority_chain', 'doctor_id',
            'doctor_type', 'visit_type', 'day',
            'time_min', 'clinic_type', 'age',
            'gender', 'token_no', 'problem_complexity'
        ]

        X = df[features]
        y = df['service_time']

        cat_features = [
            i for i, f in enumerate(features)
            if f not in ['time_min', 'age', 'token_no', 'problem_complexity']
        ]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        new_model = CatBoostRegressor(
            iterations=5000,
            learning_rate=0.03,
            depth=8,
            l2_leaf_reg=1,
            one_hot_max_size=50,
            bootstrap_type='MVS',
            loss_function='RMSE',
            random_seed=42,
            verbose=False
        )

        new_model.fit(
            X_train, y_train,
            cat_features=cat_features,
            eval_set=(X_test, y_test),
            early_stopping_rounds=300
        )

        # Atomic swap
        with model_lock:
            model = new_model
            problem_lookup = local_problem_lookup
            global_mean_service_time = local_global_mean
            last_training_time = datetime.now()

        #print(f"[{datetime.now()}] Training completed successfully")

    except Exception as e:
        pass
        #print(f"[{datetime.now()}] Training FAILED: {e}")

    finally:
        training_lock.release()


# =========================
# PREDICTION
# =========================

def predict_single_user(user_data):
    global model, problem_lookup, global_mean_service_time

    with model_lock:
        if model is None:
            return round(global_mean_service_time, 2)

        try:
            emergency = clean_basic(user_data.get('emergency', 'normal'))
            doctor_id = clean_basic(user_data.get('doctor_id', 'unknown'))
            doctor_type = clean_basic(user_data.get('doctor_type', 'general'))
            visit_type = clean_basic(user_data.get('visit_type', 'new'))
            day = clean_basic(user_data.get('day', 'monday'))
            clinic_type = clean_basic(user_data.get('clinic_type', 'urban'))
            gender = clean_basic(user_data.get('gender', 'unknown'))
            problem = clean_basic(user_data.get('problem', 'missing'))

            time_min = convert_time_to_min(user_data.get('time', '09:00'))
            age = int(user_data.get('age', 30))
            token_no = int(user_data.get('token_no', 1))

            priority_chain = f"{emergency}_{doctor_id}_{doctor_type}_{visit_type}"
            problem_comp = problem_lookup.get(problem, global_mean_service_time)

            input_df = pd.DataFrame([{
                'emergency': emergency,
                'priority_chain': priority_chain,
                'doctor_id': doctor_id,
                'doctor_type': doctor_type,
                'visit_type': visit_type,
                'day': day,
                'time_min': time_min,
                'clinic_type': clinic_type,
                'age': age,
                'gender': gender,
                'token_no': token_no,
                'problem_complexity': problem_comp
            }])

            prediction = model.predict(input_df)[0]
            return round(float(prediction), 2)

        except Exception as e:
            #print(f"Prediction error: {e}")
            return round(global_mean_service_time, 2)

# =========================
# INITIAL TRAIN
# =========================

train_model()

'''
data1 = {
    'emergency': 'no',
    'doctor_id': 'D205',
    'doctor_type': 'Gastroenterologist',
    'visit_type': 'followup',
    'day': 'Thursday',
    'time': '16:50:00',
    'clinic_type': 'semi-urban',
    'age': 32,
    'gender': 'female',
    'token_no': 14,
    'problem': 'IBS Management'
}
print(predict_single_user(data1))'''

# =========================
# SCHEDULER
# =========================

scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
scheduler.add_job(
    train_model,
    trigger="cron",
    hour=0,
    minute=0,
    max_instances=1,
    coalesce=True,
    id="nightly_model_training",
    replace_existing=True
)
scheduler.start()
