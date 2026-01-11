import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield, Users, Phone } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../hooks/useTheme';
import api from '../../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [role, setRole] = useState('patient');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const res = await api.auth.sendOtp(phone);

    localStorage.setItem('loginPhone', phone);
    localStorage.setItem('loginRole', role);

    if (res.otpId) {
      localStorage.setItem('otpId', res.otpId);
    }

    navigate('/otp');
  } catch (err) {
    setError(err.message || 'Failed to send OTP');
  } finally {
    setIsLoading(false);
  }
};

  const roles = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'admin', label: 'Admin', icon: Shield }
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
        padding: '2rem 1rem'
      }}>
        <Card glass className="w-full max-w-md">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 72,
              height: 72,
              margin: '0 auto 1rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Stethoscope size={36} />
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Welcome Back 👋
            </h1>
            <p style={{ color: '#64748b' }}>
              Sign in to continue
            </p>
          </div>

          {/* Role Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {roles.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: role === r.id
                    ? 'linear-gradient(135deg, #0891b2, #06b6d4)'
                    : '#e5e7eb',
                  color: role === r.id ? '#fff' : '#334155',
                  fontWeight: 600
                }}
              >
                <r.icon size={18} />
                <div>{r.label}</div>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <Input
              label="Phone Number"
              icon={Phone}
              placeholder="Enter mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />

            {error && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: '#fee2e2',
                color: '#991b1b',
                borderRadius: '0.5rem'
              }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Send OTP
            </Button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.875rem'
          }}>
            Don’t have an account?{' '}
            <a href="/register" style={{ color: '#0891b2', fontWeight: 600 }}>
              Register
            </a>
          </p>

        </Card>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
