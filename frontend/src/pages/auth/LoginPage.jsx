import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield, Users, ArrowRight, Phone, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../hooks/useTheme';

/**
 * LoginPage Component
 * 
 * Role-based login page with phone authentication.
 * Users can select their role (Patient, Doctor, Staff, Admin) and log in with phone number.
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  const [role, setRole] = useState('patient');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'staff') navigate('/staff/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    }, 1500);
  };

  const roles = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme === 'light' 
          ? 'linear-gradient(135deg, #0891b2 0%, #9333ea 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(163,230,253,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(216,180,254,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>

      <Card glass className="w-full max-w-md" style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
            color: 'white',
            borderRadius: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 20px 25px -5px rgba(8, 145, 178, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            <Stethoscope size={40} style={{ transform: 'rotate(5deg)' }} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Welcome Back! 👋</h1>
          <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '1rem' }}>Sign in to continue your healthcare journey</p>
        </div>

        {/* Role Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginBottom: '2rem',
          backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(51, 65, 85, 0.5)',
          padding: '0.375rem',
          borderRadius: '1rem',
          boxShadow: theme === 'light' ? 'inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.75rem 0.5rem',
                borderRadius: '0.75rem',
                background: role === r.id ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)' : 'transparent',
                color: role === r.id ? 'white' : theme === 'light' ? '#64748b' : '#94a3b8',
                boxShadow: role === r.id ? '0 4px 6px -1px rgba(8, 145, 178, 0.3)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transform: role === r.id ? 'scale(1.05)' : 'scale(1)',
                border: 'none'
              }}
            >
              <r.icon size={20} />
              {r.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <Input
            label="Phone Number"
            placeholder="Enter your mobile number"
            icon={Phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            style={{ 
              padding: '1rem',
              width: '100%', 
              marginTop: '1rem',
              background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
              boxShadow: '0 4px 6px -1px rgba(147, 51, 234, 0.3)',
              fontSize: '1rem',
              fontWeight: 600
            }}
            isLoading={isLoading}
          >
            Send OTP 
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
          Don't have an account? <a href="/register" style={{ color: theme === 'light' ? '#0891b2' : '#67e8f9', fontWeight: 600, textDecoration: 'none' }}>Register</a>
        </p>
      </Card>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;