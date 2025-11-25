import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// LANDING
import LandingPage from "./pages/LandingPage";

// AUTH PAGES
import LoginPage from "./pages/auth/LoginPage";
import OTPVerifyPage from "./pages/auth/OTPVerifyPage";
import RegisterSelectPage from "./pages/auth/RegisterSelectPage";
import RegisterPatientSelfPage from "./pages/auth/RegisterPatientSelfPage";
import RegisterDoctorPage from "./pages/auth/RegisterDoctorPage";
import RegisterStaffPage from "./pages/auth/RegisterStaffPage";
import RegisterDoctorSetupPage from "./pages/auth/RegisterDoctorSetupPage";
import SetupStaffPasswordPage from "./pages/auth/SetupStaffPasswordPage";
import SelectProfilePage from "./pages/auth/SelectProfilePage";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import ManageStaffPage from "./pages/admin/ManageStaffPage";
import ManageDoctorsPage from "./pages/admin/ManageDoctorsPage";
import ManageClinicSettingsPage from "./pages/admin/ManageClinicSettingsPage";
import ClinicListPage from "./pages/admin/ClinicListPage";

// DOCTOR PAGES
import DoctorDashboardPage from "./pages/doctor/DoctorDashboardPage";
import DoctorQueuePage from "./pages/doctor/DoctorQueuePage";
import DoctorPatientHistoryPage from "./pages/doctor/DoctorPatientHistoryPage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";

// STAFF PAGES
import StaffDashboardPage from "./pages/staff/StaffDashboardPage";
import AddWalkInPatientPage from "./pages/staff/AddWalkInPatientPage";
import ManageQueuePage from "./pages/staff/ManageQueuePage";
import PatientSearchPage from "./pages/staff/PatientSearchPage";
import StaffPatientProfilePage from "./pages/staff/PatientProfilePage";

// PATIENT PAGES
import PatientDashboardPage from "./pages/patient/PatientDashboardPage";
import PatientBookingsPage from "./pages/patient/PatientBookingsPage";
import UserPatientProfilePage from "./pages/patient/PatientProfilePage";

// SYSTEM PAGES
import NotFoundPage from "./pages/system/NotFoundPage";
import UnauthorizedPage from "./pages/system/UnauthorizedPage";
import LoadingPage from "./pages/system/LoadingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPVerifyPage />} />
        <Route path="/register" element={<RegisterSelectPage />} />
        <Route path="/register/patient" element={<RegisterPatientSelfPage />} />
        <Route path="/register/self" element={<RegisterPatientSelfPage />} />
        <Route path="/register/doctor" element={<RegisterDoctorPage />} />
        <Route path="/register/staff" element={<RegisterStaffPage />} />
        <Route path="/register/doctor-setup" element={<RegisterDoctorSetupPage />} />
        <Route path="/staff/setup-password" element={<SetupStaffPasswordPage />} />
        <Route path="/select-profile" element={<SelectProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-staff" element={<ManageStaffPage />} />
        <Route path="/admin/manage-doctors" element={<ManageDoctorsPage />} />
        <Route path="/admin/settings" element={<ManageClinicSettingsPage />} />
        <Route path="/admin/clinics" element={<ClinicListPage />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/doctor/queue" element={<DoctorQueuePage />} />
        <Route path="/doctor/patient-history" element={<DoctorPatientHistoryPage />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />

        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
        <Route path="/staff/add-patient" element={<AddWalkInPatientPage />} />
        <Route path="/staff/manage-queue" element={<ManageQueuePage />} />
        <Route path="/staff/search" element={<PatientSearchPage />} />
        <Route path="/staff/patient-profile" element={<StaffPatientProfilePage />} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
        <Route path="/patient/bookings" element={<PatientBookingsPage />} />
        <Route path="/patient/profile" element={<UserPatientProfilePage />} />

        {/* System Routes */}
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
