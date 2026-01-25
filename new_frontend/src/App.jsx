import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import BookingView from './pages/patient/BookingView';
import DoctorQueue from './pages/doctor/DoctorQueue';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Protected Route Wrapper

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard/patient" element={
        <ProtectedRoute>
          <DashboardLayout role="patient" />
        </ProtectedRoute>
      }>
        <Route index element={<BookingView />} />
      </Route>

      <Route path="/dashboard/doctor" element={
        <ProtectedRoute>
          <DashboardLayout role="doctor" />
        </ProtectedRoute>
      }>
        <Route index element={<DoctorQueue />} />
      </Route>

      <Route path="/dashboard/admin" element={
        <ProtectedRoute>
          <DashboardLayout role="admin" />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
