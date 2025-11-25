import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/patient/dashboard'); // Default to patient for now
    }, 1000);
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
        <p style={{ color: 'var(--slate-500)', marginBottom: '2rem' }}>Enter the 4-digit code sent to your phone.</p>

        <form onSubmit={handleVerify}>
          <Input
            placeholder="0 0 0 0"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
            maxLength={4}
            required
          />

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