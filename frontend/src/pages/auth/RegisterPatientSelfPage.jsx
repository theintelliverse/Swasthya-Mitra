import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import api from '../../services/api';

const RegisterPatientSelfPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1️⃣ Register patient
      await api.post('/auth/register', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      });

      // 2️⃣ Send OTP
      const res = await api.post('/auth/send-otp', {
        phone: formData.phone
      });

      // 3️⃣ Store temp auth data for OTP page
      localStorage.setItem('loginPhone', formData.phone);
      localStorage.setItem('loginRole', 'patient');
      if (res.data?.otpId) {
        localStorage.setItem('otpId', res.data.otpId);
      }

      // 4️⃣ Go to OTP verification
      navigate('/otp');

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))',
      padding: '1rem',
      position: 'relative'
    }}>
      {/* Back to Home */}
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
          background: 'white',
          borderRadius: '0.75rem',
          cursor: 'pointer'
        }}
      >
        <Home size={18} />
        Back to Home
      </button>

      <Card glass className="w-full max-w-md" style={{ maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Create Account
          </h1>
          <p style={{ color: 'var(--slate-600)' }}>
            Join Swasthya-Mitra for better health
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            icon={User}
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            icon={Phone}
            placeholder="Enter your mobile number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            icon={Lock}
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {error && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            style={{ marginTop: '1rem' }}
          >
            Register & Verify <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.875rem',
          color: 'var(--slate-600)'
        }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
            Login
          </a>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPatientSelfPage;
