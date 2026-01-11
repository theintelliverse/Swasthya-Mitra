import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Stethoscope, Home, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import api from '../../services/api';

const RegisterDoctorPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1️⃣ Register doctor as user
      await api.post('/auth/register', {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      // 2️⃣ Send OTP
      const res = await api.post('/auth/send-otp', {
        phone: formData.phone
      });

      // Store temp data for OTP page
      localStorage.setItem('loginPhone', formData.phone);
      localStorage.setItem('loginRole', 'doctor');
      if (res.data?.otpId) {
        localStorage.setItem('otpId', res.data.otpId);
      }

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
      background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))',
      padding: '2rem 1rem'
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/register')}
        style={{
          position: 'fixed',
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
        <Home size={18} /> Back
      </button>

      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <Card glass style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--secondary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Stethoscope size={32} />
            </div>
            <h1 style={{ fontSize: '1.75rem' }}>Doctor Registration</h1>
            <p style={{ color: 'var(--slate-600)' }}>
              Create your doctor account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              icon={User}
              placeholder="Dr. John Doe"
              value={formData.fullName}
              onChange={e => updateFormData('fullName', e.target.value)}
              required
            />

            <Input
              label="Email"
              icon={Mail}
              type="email"
              placeholder="doctor@example.com"
              value={formData.email}
              onChange={e => updateFormData('email', e.target.value)}
              required
            />

            <Input
              label="Phone Number"
              icon={Phone}
              placeholder="9876543210"
              value={formData.phone}
              onChange={e => updateFormData('phone', e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={e => updateFormData('password', e.target.value)}
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
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Register & Get OTP <ArrowRight size={18} />
            </Button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.875rem'
          }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
              Login
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterDoctorPage;
