# Database Schema – Swasthya-Mitra
A realistic, scalable, clinic-focused database schema covering **user registration, authentication, roles, OTP login, multi-clinic support, staff workflows, and doctor onboarding**.

This schema is based on real Indian clinic workflows (walk-ins, shared phone numbers, staff churn, OTP login, doctors working in multiple clinics, WhatsApp login, etc.).

---

# 1. Overview

Swasthya-Mitra uses a modular, scalable DB structure:

- **User** → The identity (phone/email/password)
- **UserProfile** → The personal/medical profile
- **Clinic** → A clinic/center
- **ClinicUser** → Role assignment per clinic
- **AuthProvider** → Password, OTP, WhatsApp, Google login
- **OTP** → Temporary OTP management
- **Session** → Refresh tokens & device sessions

This structure supports:

✔ Walk-in patients  
✔ OTP-only patients  
✔ Doctors added by admin  
✔ Staff with permissions  
✔ One user → multiple clinics  
✔ One phone → multiple family profiles  
✔ Doctor/patient dual roles  
✔ Duplicate patient handling  

---
# Schema Purpose – Swasthya-Mitra
A short, clear description of why each schema exists in the system.

---

## 1. User
**Purpose:** Core identity of a person.  
**Why needed:**  
- Stores phone/email/password for authentication  
- Represents a real human (not role-specific)  

---

## 2. UserProfile
**Purpose:** Personal details of the user.  
**Why needed:**  
- One phone → multiple family profiles  
- A doctor can also be a patient  
- Separates identity from personal/medical info  

---

## 3. Clinic
**Purpose:** Represents each clinic/center.  
**Why needed:**  
- Users belong to clinics  
- Supports multi-clinic owners and multi-location setups  

---

## 4. ClinicUser
**Purpose:** Role assignment per clinic.  
**Why needed:**  
- A user can be doctor in Clinic A, patient in Clinic B  
- Staff roles differ per clinic  
- Controls permissions and access  

---

## 5. AuthProvider
**Purpose:** Different login mechanisms.  
**Why needed:**  
- Patients → OTP  
- Doctors/staff → Password + OTP  
- Easy support for WhatsApp/Google login  
- Future-proof authentication  

---

## 6. OTP
**Purpose:** Stores temporary OTP codes.  
**Why needed:**  
- Secure phone verification  
- Rate limiting & tracking attempts  
- Supports SMS + WhatsApp flows  

---

## 7. Session
**Purpose:** Tracks logged-in devices and refresh tokens.  
**Why needed:**  
- Instant staff access revocation  
- Multi-device login support  
- Detect suspicious logins  

---

## 8. PossibleDuplicates (Optional)
**Purpose:** Detects similar patient profiles.  
**Why needed:**  
- Clinics commonly create duplicate patient entries  
- Enables merging and data cleanup  

---

# Summary Table

| Schema | Purpose |
|--------|---------|
| **User** | Identity + authentication base |
| **UserProfile** | Personal/medical details |
| **Clinic** | A clinic/location |
| **ClinicUser** | Role + permissions per clinic |
| **AuthProvider** | Login methods (OTP, password, WhatsApp) |
| **OTP** | Verification codes |
| **Session** | Device sessions & token management |
| **PossibleDuplicates** | Detect & merge duplicate patients |




# 2. User Schema (Identity Layer)

```json
{
  "id": "UUID/ID",
  "phone": "string | null",
  "email": "string | null",
  "passwordHash": "string | null",
  "isPhoneVerified": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}

UserProfile Schema (Personal Details)
{
  "id": "UUID/ID",
  "userId": "FK → User.id",
  "name": "string",
  "age": "number | null",
  "gender": "string",
  "patientType": "patient | doctor | staff | admin",
  "specialization": "string | null",
  "licenseNumber": "string | null",
  "experienceYears": "number | null",
  "isActive": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
Clinic Schema
{
  "id": "UUID/ID",
  "name": "string",
  "address": "string",
  "ownerUserId": "FK → User.id",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}

ClinicUser Schema (Role Assignment Per Clinic)
{
  "id": "UUID/ID",
  "clinicId": "FK → Clinic.id",
  "userId": "FK → User.id",
  "role": "patient | doctor | staff | admin",
  "permissions": ["string"],
  "isActive": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}

OTP Schema (Temporary Authentication)
{
  "id": "UUID/ID",
  "userId": "FK → User.id | null",
  "phone": "string",
  "otpCode": "string",
  "expiresAt": "datetime",
  "attempts": "number",
  "isUsed": "boolean",
  "createdAt": "datetime"
}

AuthProvider Schema (Login Methods)
{
  "id": "UUID/ID",
  "userId": "FK → User.id",
  "providerType": "password | otp | whatsapp | google",
  "passwordHash": "string | null",
  "lastUsedAt": "datetime",
  "createdAt": "datetime"
}

Session Schema (Device/Token Layer)
{
  "id": "UUID/ID",
  "userId": "FK → User.id",
  "deviceInfo": "string",
  "ipAddress": "string",
  "refreshTokenHash": "string",
  "expiresAt": "datetime",
  "isRevoked": "boolean",
  "createdAt": "datetime"
}

```