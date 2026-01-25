# Swasthya-Mitra Backend API Guide

**Base URL:** `http://localhost:3000/api`

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/send-otp` | Send OTP to phone | `{ "phone": "9876543210" }` | `{ "message": "OTP sent", "otpId": "..." }` |
| **POST** | `/verify-otp` | Verify OTP | `{ "phone": "...", "otp": "123456" }` | `{ "message": "OTP verified", "accessToken": "...", "refreshToken": "..." }` |
| **POST** | `/register` | Register new user | `{ "phone": "...", "name": "...", "password": "...", "role": "patient" }` | `{ "message": "Registered", "userId": "..." }` |
| **POST** | `/login` | Login with Password | `{ "phoneOrEmail": "...", "password": "..." }` | `{ "message": "Login successful", "accessToken": "..." }` |

---

## 2. User Profile (`/users`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/me` | Get Current Profile | - | `{ "_id": "...", "phone": "...", "profile": { ... } }` |

---

## 3. Clinics (`/clinics`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/all` | List all clinics | - | `[ { "_id": "...", "name": "...", "address": "..." } ]` |
| **GET** | `/my-clinics` | List clinics I manage | - | `[ ... ]` |
| **GET** | `/:clinicId` | Get Specific Clinic | - | `{ "name": "...", "doctors": [...] }` |
| **GET** | `/:clinicId/doctors` | Get Doctors in Clinic | - | `[ { "userId": { "name": "Dr. X" }, "specialization": "..." } ]` |
| **POST** | `/` | Create Clinic | `{ "name": "...", "address": "...", "phone": "..." }` | `{ "message": "Clinic created", "clinic": { ... } }` |

### Clinic User Management (`/clinics/:clinicId/users`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/` | Add User to Clinic | `{ "userId": "...", "role": "doctor" }` | `{ "message": "User added" }` |
| **GET** | `/` | List Clinic Staff | - | `[ { "userId": "...", "role": "doctor" } ]` |
| **PUT** | `/:userId` | Update Role | `{ "role": "admin" }` | `{ "message": "Updated" }` |
| **DELETE** | `/:userId` | Remove User | - | `{ "message": "Removed" }` |

---

## 4. Appointments (`/appointments`)

| Method | Endpoint | Description | Params / Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | List My Appointments | - | `[ { "date": "...", "status": "scheduled", "doctor": { ... } } ]` |
| **GET** | `/:id` | Get Details | - | `{ "_id": "...", "patient": ..., "notes": "..." }` |
| **POST** | `/` | Book Appointment | `{ "clinicId": "...", "doctorId": "...", "date": "YYYY-MM-DD", "time": "HH:MM" }` | `{ "message": "Appointment created", "id": "..." }` |
| **PUT** | `/:id/reschedule` | Reschedule | `{ "date": "...", "time": "..." }` | `{ "message": "Rescheduled" }` |
| **POST** | `/:id/cancel` | Cancel | - | `{ "message": "Cancelled" }` |
| **POST** | `/checkin` | Check-in Patient | `{ "appointmentId": "..." }` (or `patientId` for walk-in) | `{ "message": "Checked in", "queueNumber": 5 }` |
| **POST** | `/:id/complete` | Mark Complete | - | `{ "message": "Completed" }` |

---

## 5. Doctor Dashboard (`/doctor`)

| Method | Endpoint | Description | Query Params | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/today-appointments` | Today's Schedule | `?clinicId=...` | `{ "items": [ ... ] }` |
| **GET** | `/today-queue` | Live Queue | `?clinicId=...` | `{ "waiting": [...], "current": {...}, "count": 5 }` |
| **GET** | `/summary` | Stats (Total/Done) | `?clinicId=...&days=7` | `{ "total": 10, "completed": 8, "avgWaitMinutes": 15 }` |
| **GET** | `/patients` | Recent Patients | `?clinicId=...` | `{ "patients": [ ... ] }` |
| **POST** | `/queue/action` | Control Queue | Body: `{ "action": "NEXT" | "SKIP" | "COMPLETE", "clinicId": "..." }` | `{ "success": true }` |

---

## 6. Patient App (`/patient`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/book` | Quick Book | `{ "doctorId": "...", "clinicId": "...", "slot": "..." }` | `{ "message": "Booked" }` |
| **GET** | `/appointments` | My History | - | `[ ... ]` |
| **GET** | `/queue-status` | My Live Queue Status | - | `{ "position": 3, "estimatedWait": 15 }` |

---

## 7. Queue Management (`/queue`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/add` | Add Walk-in | `{ "patientId": "...", "clinicId": "...", "doctorId": "..." }` | `{ "queueNumber": 10 }` |
| **GET** | `/status` | Get Queue Info | `?clinicId=...` | `{ "length": 5 }` |

---

## 8. Admin (`/admin`)

| Method | Endpoint | Description | Response |
| :--- | :--- | :--- | :--- |
| **GET** | `/clinics/:id/analytics` | Clinic Stats | `{ "appointments": 100, "revenue": ... }` |
| **GET** | `/clinics/:id/staff` | Staff List | `[ ... ]` |

---

## Error Handling

All API errors follow this format:
```json
{
  "error": "Short error message",
  "details": "Detailed technical info (optional)"
}
```
**Common Codes:**
- `400`: Bad Request (Missing params)
- `401`: Unauthorized (Invalid Token)
- `403`: Forbidden (Wrong Role)
- `500`: Server Error
