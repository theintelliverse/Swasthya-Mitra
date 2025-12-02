import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import api from '../../services/api';

/**
 * RegisterPatientSelfPage Component
 * 
 * Patient self-registration page.
 * Allows new patients to create an account by providing basic information.
 */
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
      await api.auth.register(formData);
      // After registration, redirect to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--slate-600)' }}>Join Swasthya-Mitra for better health.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            placeholder="Enter your mobile number"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {error && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            style={{ width: '100%', marginTop: '1rem' }}
            isLoading={isLoading}
          >
            Register <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>Login</a>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPatientSelfPage;