import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield, Users, ArrowRight, Phone, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

/**
 * LoginPage Component
 * 
 * Role-based login page with phone authentication.
 * Users can select their role (Patient, Doctor, Staff, Admin) and log in with phone number.
 */
const LoginPage = () => {
  const navigate = useNavigate();
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
      padding: '1rem',
      position: 'relative'
    }}>
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'white',
          color: 'var(--slate-700)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-normal)',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--slate-50)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
      >
        <Home size={18} />
        Back to Home
      </button>

      <Card glass className="w-full max-w-md" style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-600)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Stethoscope size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--slate-500)' }}>Sign in to Swasthya-Mitra</p>
        </div>

        {/* Role Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginBottom: '2rem',
          backgroundColor: 'var(--slate-100)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-lg)'
        }}>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: role === r.id ? 'white' : 'transparent',
                color: role === r.id ? 'var(--primary-600)' : 'var(--slate-500)',
                boxShadow: role === r.id ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)',
                fontSize: '0.75rem',
                fontWeight: 500
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
            className="w-full"
            style={{ width: '100%', marginTop: '1rem' }}
            isLoading={isLoading}
          >
            Send OTP <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>Register</a>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;