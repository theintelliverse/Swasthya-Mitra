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
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/select-profile" element={<ProtectedRoute><SelectProfilePage /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-staff" element={<ProtectedRoute allowedRoles={['admin']}><ManageStaffPage /></ProtectedRoute>} />
        <Route path="/admin/manage-doctors" element={<ProtectedRoute allowedRoles={['admin']}><ManageDoctorsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><ManageClinicSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/clinics" element={<ProtectedRoute allowedRoles={['admin']}><ClinicListPage /></ProtectedRoute>} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboardPage /></ProtectedRoute>} />
        <Route path="/doctor/queue" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorQueuePage /></ProtectedRoute>} />
        <Route path="/doctor/patient-history" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorPatientHistoryPage /></ProtectedRoute>} />
        <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorProfilePage /></ProtectedRoute>} />

        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboardPage /></ProtectedRoute>} />
        <Route path="/staff/add-patient" element={<ProtectedRoute allowedRoles={['staff']}><AddWalkInPatientPage /></ProtectedRoute>} />
        <Route path="/staff/manage-queue" element={<ProtectedRoute allowedRoles={['staff']}><ManageQueuePage /></ProtectedRoute>} />
        <Route path="/staff/search" element={<ProtectedRoute allowedRoles={['staff']}><PatientSearchPage /></ProtectedRoute>} />
        <Route path="/staff/patient-profile" element={<ProtectedRoute allowedRoles={['staff']}><StaffPatientProfilePage /></ProtectedRoute>} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboardPage /></ProtectedRoute>} />
        <Route path="/patient/bookings" element={<ProtectedRoute allowedRoles={['patient']}><PatientBookingsPage /></ProtectedRoute>} />
        <Route path="/patient/profile" element={<ProtectedRoute allowedRoles={['patient']}><UserPatientProfilePage /></ProtectedRoute>} />

        {/* System Routes */}
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
