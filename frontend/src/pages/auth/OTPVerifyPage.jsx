import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const phone = localStorage.getItem('loginPhone');
      const otpId = localStorage.getItem('otpId');
      const role = localStorage.getItem('loginRole') || 'patient';

      if (!phone) {
        throw new Error('Phone number not found. Please start from login page.');
      }

      const response = await api.auth.verifyOtp(phone, otp, otpId);

      // Store tokens and login
      const loginResult = await login(response.accessToken, response.refreshToken, response.userId);

      // Clear temp storage
      localStorage.removeItem('loginPhone');
      localStorage.removeItem('otpId');
      localStorage.removeItem('loginRole');

      // Navigate based on profile selection need
      if (loginResult.needsProfileSelection) {
        navigate('/select-profile');
      } else {
        // Navigate based on  role
        if (role === 'doctor') navigate('/doctor/dashboard');
        else if (role === 'staff') navigate('/staff/dashboard');
        else if (role === 'admin') navigate('/admin/dashboard');
        else navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP');
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
      padding: '1rem'
    }}>
      <Card glass className="w-full max-w-md" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--success)',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <ShieldCheck size={32} />
        </div>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Verify OTP</h1>
        <p style={{ color: 'var(--slate-500)', marginBottom: '2rem' }}>Enter the 6-digit code sent to your phone.</p>

        <form onSubmit={handleVerify}>
          <Input
            placeholder="0 0 0 0 0 0"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
            maxLength={6}
            required
          />

          {error && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              textAlign: 'left'
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
            Verify <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>

        <Button variant="ghost" size="sm" style={{ marginTop: '1rem' }}>Resend OTP</Button>
      </Card>
    </div>
  );
};

export default OTPVerifyPage;