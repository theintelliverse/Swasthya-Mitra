# User Registration – Swasthya-Mitra  
A realistic, practical, and production-focused explanation of the user registration process in a healthcare system. This document covers **patients, doctors, staff, admins**, and the real-world challenges that clinics face during onboarding.

---

## 📌 Why Registration Works Differently in Healthcare

Healthcare systems deal with sensitive data, multiple roles, shared phone numbers, walk-ins, and users with low digital literacy.  
Therefore registration flows must handle:

- Walk-in patients without OTP  
- Doctors who don’t self-register  
- Staff turnover  
- Duplicate patient profiles  
- Shared family phone numbers  
- WhatsApp-based onboarding  
- Instant account disabling  
- Internal misuse prevention  

---

# 1. User Types & Their Realistic Registration Behaviours

## 👤 1. Patient
Most patients **do not register themselves**.

### Real-life cases:
- Receptionist enters details during walk-in.
- Patient provides incomplete info (e.g., "Ramesh Uncle").
- Phone numbers often reused by family members.
- Elderly patients cannot register via app.
- Patients sometimes don’t want to give their number.
- Duplicate entries due to spelling variations.

### Main expectations:
- **Fast onboarding**, even without OTP.
- Ability to later “claim” their profile via phone number.
- Option for OTP login instead of passwords.

---

## 🩺 2. Doctor
Doctors almost **never self-register** in India’s clinic workflows.

### Real-life behaviour:
- Clinic owner/admin adds the doctor manually.
- Doctor receives a WhatsApp login link.
- Many doctors avoid passwords → prefer OTP.
- License verification may be needed.
- One doctor can work in multiple clinics.

### Needs:
- Password OR OTP login  
- Role-specific permissions  
- License verification (optional)

---

## 🧑‍💼 3. Receptionist/Staff
Staff accounts are created by the clinic owner or admin.

### Real-life issues:
- High staff turnover → accounts must be disabled quickly.
- Staff forget passwords often.
- Many staff don’t use email → rely on phone OTP.
- Staff misuse access if accounts aren’t restricted.

### Needs:
- Role-based permissions  
- Quick account disable  
- OTP login preferred  

---

## 👑 4. Admin / Clinic Owner
Admins usually self-register or get help from support.

### Real-life needs:
- Full control over clinic settings  
- Ability to create/disable staff & doctors  
- Multi-clinic management (optional)

---

# 2. Registration Flows (Practical)

## 🧾 A. Patient Registration Flow (Realistic)

### Case 1: Walk-In Patient (Receptionist-driven)
- Receptionist enters patient name, age, gender.
- Phone number optional.
- No OTP, no password.
- Patient added to queue instantly.

**Ideal for fast OPD workflow.**

---

### Case 2: Patient Self-Registration (Mobile App/Web)
Steps:
1. Enter phone number
2. Receive OTP
3. Verify OTP
4. Enter name → Done

**No password needed.**  
OTP login is more realistic and reduces support tickets.

---

## 🩺 B. Doctor Registration Flow (Realistic)
1. Admin adds doctor → name, mobile, specialization.
2. System sends WhatsApp login link or OTP.
3. Doctor logs in and completes profile.
4. (Optional) Upload license details for verification.

**Most doctors skip email entirely — WhatsApp works best.**

---

## 🧑‍💼 C. Staff Registration Flow
1. Admin adds staff: name + phone.
2. Staff receives OTP login link.
3. Staff gets limited access.

**Must support instant disable** because staff changes frequently.

---

# 3. Passwords vs OTP (Realistic Choice)

| User Type | Password | OTP Login |
|----------|----------|-----------|
| Patient | ❌ Not recommended | ✅ Yes |
| Doctor | Optional | Highly preferred |
| Staff | Optional | Recommended |
| Admin | Recommended | Yes |

**WhatsApp OTP is often more reliable than SMS OTP for doctors.**

---

# 4. Handling Real-World Problems

## 🔁 Duplicate Patients
Common in clinics:
- "Ramesh", "Ramesh K.", "Ramesh Kumar" → same person  
- Wrong spelling  
- Different numbers on different visits  

**Solution:**  
- Fuzzy matching  
- Admin "merge profiles" feature  
- Allow updating phone number without losing records  

---

## 👨‍👩‍👧 Shared Phone Numbers
Many families use one number.

Solution:
- Multiple patient profiles under one phone number  
- User selects **who** is the patient during booking  

---

## 🔐 Internal Misuse Prevention
Bigger risk than external hacking.

Solutions:
- Activity logs (staff viewed X patient at 3 PM)
- Role-based permissions
- Instant token invalidation
- Limit staff access to only today’s OPD patients

---

# 5. Verification Methods

### Email Verification  
❌ Mostly useless for Indian clinics. Doctors rarely check email.

### SMS OTP  
✔ Standard  
⚠ Sometimes slow

### WhatsApp OTP/Login  
✔ Preferred by doctors  
✔ More reliable  
✔ Faster  
