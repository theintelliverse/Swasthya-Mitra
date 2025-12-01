Patient Arrives
      ↓
Add to Queue (/queue/add)
      ↓
Doctor Clicks NEXT (/queue/next)
      ↓
Patient enters room (status = in_consultation)
      ↓
Doctor clicks COMPLETE (/queue/complete)
      ↓
Entry moves → QueueHistory
      ↓
Next patient auto-loaded


## Queue Schema 

This schema represents patients currently waiting or being consulted in a clinic for a specific doctor.

Used by:
Staff (Add patients, skip, recall)
Doctors (Next, complete)
Queue board display
AI wait-time prediction input

| Field                | Description                                                                | Where It’s Used                                   |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| **clinicId**         | Clinic where patient is queued                                             | Identifies correct clinic for multi-clinic setups |
| **doctorUserId**     | The doctor whose queue this is                                             | Allows per-doctor queues in a single clinic       |
| **patientProfileId** | The patient’s profile entry                                                | Supports family profiles + patient history        |
| **appointmentId**    | Links to appointment if booked                                             | Allows merging “appointments” + “walk-ins”        |
| **queueNumber**      | The patient’s queue number                                                 | Shown to patient, staff, doctor, queue screens    |
| **status**           | Current state of patient → `waiting`, `skipped`, `in_consultation`, `done` | Used by staff/doctor to manage flow               |
| **checkInTime**      | Time patient joined queue                                                  | Later used to calculate wait times                |
| **calledAt**         | Time doctor pressed “Next”                                                 | Used to calculate actual wait time                |
| **completedAt**      | Time consultation ended                                                    | Used to calculate consultation duration           |
| **timestamps**       | Auto-recorded createdAt / updatedAt                                        | For auditing + backend -debugging                  |


## QueueHistory Schema (Completed Consultations)

When a patient’s consultation finishes, their Queue entry is moved into QueueHistory.

Used by:
AI training (predict wait time)
Doctor analytics
Clinic reports
Daily summary of doctor performance


| Field                    | Description                             | Where It’s Used                        |
| ------------------------ | --------------------------------------- | -------------------------------------- |
| **clinicId**             | Clinic where consultation happened      | Filtering history per clinic           |
| **doctorUserId**         | Doctor who saw the patient              | Doctor performance insights            |
| **patientProfileId**     | Patient profile                         | Create patient history + visit count   |
| **appointmentId**        | Original appointment (optional)         | Track if patient was walk-in or booked |
| **queueNumber**          | Their queue number                      | Used in reporting                      |
| **checkInTime**          | When patient entered queue              | Used to compute wait time              |
| **calledAt**             | When doctor called the patient          | Used to compute actual wait time       |
| **completedAt**          | When consultation ended                 | Used to compute consultation duration  |
| **actualWaitTime**       | Minutes waited (calledAt - checkInTime) | Input for AI model                     |
| **consultationDuration** | Minutes doctor spent                    | Measures doctor speed per patient      |
| **date**                 | Date-only field                         | Easier for daily analytics             |
| **timestamps**           | createdAt / updatedAt                   | Audit logs                             |


## QueueCounter Schema (Queue Number Generator)

This schema helps generate unique queue numbers per doctor per day.

Used by:
/queue/add route
Avoiding duplicate queue numbers
Resetting numbers daily

Why it exists?
If doctor sees 40 patients a day, next day queue should start from 1 again.
This schema stores the last used number for each doctor per date.

| Field             | Description                     | Where It’s Used                         |
| ----------------- | ------------------------------- | --------------------------------------- |
| **clinicId**      | The clinic                      | Helps support multi-clinic architecture |
| **doctorUserId**  | The doctor                      | Each doctor has separate queue          |
| **currentNumber** | Latest queue number given today | Next queue number = currentNumber + 1   |
| **date**          | YYYY-MM-DD string               | Ensures counters reset daily            |
| **timestamps**    | createdAt / updatedAt           | For debugging / audits                  |


## 🏥 Queue Management System (Crisp Documentation)


## 1️⃣ Purpose

The Queue Management System handles the real-time OPD patient flow for each doctor inside a clinic.
It replaces manual queues and enables smooth digital patient movement.

## 2️⃣ Features

Add patients (walk-in or appointment) to queue
Auto-generate queue numbers per doctor per day
Real-time queue view for staff/doctors
Skip / recall patients
Doctor “Next” flow
Complete consultations
Move completed entries to history
Store wait time + consultation duration
Supports multi-clinic & multi-doctor setups


## 3️⃣ Completed Tasks

Queue, QueueHistory, QueueCounter schemas
Queue routes added to backend
Queue number generator
Add → Next → Skip → Recall → Complete flow
Automatic movement to QueueHistory
Calculation of wait time & consultation time
Working, production-ready backend


## 4️⃣ Queue Routes (with concise explanation)


# 🔹 POST /queue/add

Adds a patient to doctor’s queue.
Generates next queue number for the day.

# 🔹 GET /queue/status

Returns:
waiting list
current consulting patient
total count
Used by doctor dashboard & staff queue screen.

# 🔹 POST /queue/next

Doctor moves to next patient.
Moves previous patient → QueueHistory.
Marks new patient → in_consultation.

# 🔹 POST /queue/skip

Marks a patient as skipped (temporary).
They remain in queue but won’t be called.

# 🔹 POST /queue/recall

Changes skipped → waiting.
Puts patient back into queue flow.

# 🔹 POST /queue/complete

Marks current consultation as done.
Moves entry → QueueHistory with wait & consultation duration