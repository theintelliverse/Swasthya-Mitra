# SECTION A — General App Flow

Landing Page → Login/Signup → Dashboard → Clinic Pages → Staff/Doctor/Patient Pages


# SECTION B — Page-by-Page Mapping


## 1️⃣ Login Pages (OTP Login + Password Login)


📱 Page: Enter Phone Number
Purpose: Allow patient/doctor/staff to login using OTP
**Call:**
POST /auth/send-otp

Trigger:
User enters phone → clicks “Send OTP”

Response:
otpId → store it

Move to OTP screen
📱 Page: Enter OTP

Purpose: Verify OTP, log user in

**Call:**
POST /auth/verify-otp

Trigger:
User enters OTP → clicks “Verify”

Expect:
accessToken → save in localStorage
refreshToken → save securely
userId

→ Redirect to Dashboard

## 🔑 Page: Password Login (Staff + Doctors)

Purpose: Login via password

**Call:**
POST /auth/login

Trigger:
Enter phone/email + password → “Login”

Expect:
accessToken
refreshToken
userId

## 🧾 Page: Register (for staff/admin)

Purpose: Register via password + name

Call:
POST /auth/register

Trigger:
User enters phone/email/password/name → submit

# 2️⃣ Dashboard Page

After login, the frontend should fetch:

**Call:**
GET /me
Authorization: Bearer <accessToken>

Purpose:
Load user info
Load all UserProfiles
Load assigned clinics + roles

Used for:
Decide UI: doctor / staff / admin / patient
Show relevant options
Show clinic list selection screen

# 3️⃣ Clinic Management Pages (For Admin/Owner Only)

## 🏥 Page: Create Clinic

Purpose: Allow clinic owner to register clinic

**Call:**
POST /clinics
Authorization: Bearer <accessToken>

Trigger:
Owner enters clinic name + address → clicks “Create”

Result:
A new clinic is created
Owner becomes clinic admin

## 👥 Page: Add Doctor / Add Staff to Clinic

Purpose: Administrators can assign users to clinics

**Call:**
POST /clinic-user
Authorization: Bearer <accessToken>

Body:
{
  clinicId,
  userId,
  role: "doctor" | "staff" | "admin" | "patient",
  permissions: [...]
}

Trigger:
Admin selects a user from a list → assigns role
Or admin enters user phone → after OTP login, assign

## 📋 Page: View Clinic Members List
Purpose: Show which users belong to clinic
**Call:**

(frontend will need a new route soon)
GET /clinic-user/list?clinicId=
(You will add this later — not required right now for identity layer)

# 4️⃣ Patient Pages

## 🧑‍🦰 Page: Patient Profile List

Shows all profiles for logged-in user.
**Call:**
GET /me
Use:
response.profiles[]

##🏥 Page: Clinic Selection

When patient selects a clinic to visit:
Use clinic data from:
GET /me


## 🔗 Page: Map Patient to Clinic (Backend Already Supports It)

To map patient to a clinic:

**Call:**
POST /clinic-user


With:

role: "patient"

# 5️⃣ Session & Token Handling

## 🔄 Refresh Token Process (Background)

When accessToken expires → frontend should call:
POST /auth/refresh
Body: { refreshToken }
→ Receive new access token
→ Continue silently


# ❌ Logout

Purpose: revoke session

**Call:**
POST /auth/logout


Trigger:
User clicks "Logout"



                ┌───────────────────────┐
                │      Landing Page     │
                └───────────┬──────────┘
                            ↓
           ┌─────────────────────────────────┐
           │         Login Options           │
           └───────────┬────────────┬───────┘
                       ↓             ↓
         ┌──────────────────┐   ┌──────────────────┐
         │   OTP Login       │   │ Password Login   │
         └───────┬──────────┘   └──────┬──────────┘
                 ↓                      ↓
       ┌──────────────────┐     ┌──────────────────┐
       │  Enter Phone No   │     │ Enter Email/Phone│
       └───────┬──────────┘     │ + Password       │
               ↓                └───────┬──────────┘
   ┌──────────────────┐                ↓
   │  Send OTP (API)  │         ┌─────────────────────┐
   └───────┬──────────┘         │ /auth/login         │
           ↓                    └─────────┬───────────┘
   ┌──────────────────┐                ↓
   │  Enter OTP Page  │     ┌──────────────────────────┐
   └───────┬──────────┘     │  Dashboard (GET /me)     │
           ↓                 └──────────┬──────────────┘
┌──────────────────────┐               ↓
│ /auth/verify-otp     │     ┌──────────────────────────────┐
└─────────────┬────────┘     │   Select Clinic (if many)     │
              ↓              └───────────┬──────────────────┘
       ┌──────────────────┐             ↓
       │  Dashboard (/me) │     ┌──────────────────────────────┐
       └───────┬──────────┘     │     Clinic Home Page         │
               ↓                └───────────┬──────────────────┘
   ┌──────────────────────┐                ↓
   │ If Admin → Create    │        If Admin: Manage Clinic
   │ Clinic (/clinics)    │                │
   └─────────┬────────────┘   ┌────────────────────────────────┐
             ↓                │ Add Doctor  (/clinic-user)     │
   ┌──────────────────────┐   │ Add Staff   (/clinic-user)     │
   │ Clinic Dashboard      │   │ Add Patient (/clinic-user)     │
   └──────────────────────┘   └────────────────────────────────┘
