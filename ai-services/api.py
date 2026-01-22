from fastapi import FastAPI
from model import predict_single_user  # replace with actual filename

app = FastAPI()

@app.post("/predict")
def predict(data: dict):
    wait_time = predict_single_user(data)
    return {
        "estimated_wait_time": wait_time
    }
