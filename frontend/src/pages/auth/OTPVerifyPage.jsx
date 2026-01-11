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

      console.log('[OTP VERIFY] phone:', phone);
      console.log('[OTP VERIFY] otpId:', otpId);
      console.log('[OTP VERIFY] raw otp:', otp);

      if (!phone) {
        throw new Error('Phone number not found. Please login again.');
      }

      const cleanOtp = otp.replace(/\s+/g, '');

      console.log('[OTP VERIFY] clean otp:', cleanOtp);

      const payload = {
        phone,
        otpCode: cleanOtp,
        otpId,
      };

      console.log('[OTP VERIFY] payload → backend:', payload);

      // ✅ CORRECT API CALL
      const res = await api.auth.verifyOtp(
        phone,
        cleanOtp,
        otpId
      );

      console.log('[OTP VERIFY] backend response:', res);

      // store tokens via auth hook
      await login(res.accessToken, res.refreshToken, res.userId);

      // cleanup temp values
      localStorage.removeItem('loginPhone');
      localStorage.removeItem('otpId');
      localStorage.removeItem('loginRole');

      // role-based redirect (frontend hint only)
      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'staff') navigate('/staff/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');

    } catch (err) {
      console.error('[OTP VERIFY] error:', err);
      setError(err.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const phone = localStorage.getItem('loginPhone');
      if (!phone) return;

      console.log('[OTP RESEND] phone:', phone);

      const res = await api.auth.sendOtp(phone);

      console.log('[OTP RESEND] response:', res);

      if (res.otpId) {
        localStorage.setItem('otpId', res.otpId);
      }
    } catch (err) {
      console.error('[OTP RESEND] error:', err);
      setError('Failed to resend OTP');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))',
      padding: '1rem'
    }}>
      <Card glass className="w-full max-w-md" style={{ textAlign: 'center' }}>

        <div style={{
          width: 64,
          height: 64,
          margin: '0 auto 1.5rem',
          borderRadius: '50%',
          backgroundColor: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          <ShieldCheck size={32} />
        </div>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          Verify OTP
        </h1>
        <p style={{ color: 'var(--slate-500)', marginBottom: '2rem' }}>
          Enter the 6-digit code sent to your phone
        </p>

        <form onSubmit={handleVerify}>
          <Input
            placeholder="0 0 0 0 0 0"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength={6}
            required
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              letterSpacing: '0.5rem'
            }}
          />

          {error && (
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              textAlign: 'left'
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
            Verify <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          style={{ marginTop: '1rem' }}
        >
          Resend OTP
        </Button>

      </Card>
    </div>
  );
};

export default OTPVerifyPage;
