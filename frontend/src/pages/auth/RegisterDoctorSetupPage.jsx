import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Stethoscope, Award, Clock, Save } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const RegisterDoctorSetupPage = () => {
  const { theme } = useTheme();
  const { user, selectedProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialization: '',
    experience: '',
    qualifications: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Assuming an API endpoint exists to update doctor profile
      // If not, we might need to create one or use a generic update
      // For now, we'll simulate it or use a placeholder if api.doctor.update doesn't exist
      // api.doctor.updateProfile(formData);
      console.log('Updating doctor profile:', formData);

      // Simulate success
      setTimeout(() => {
        navigate('/doctor/dashboard');
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a',
      padding: '1rem'
    }}>
      <Card style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Stethoscope size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>
            Complete Your Profile
          </h1>
          <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
            Tell us more about your professional background.
          </p>
        </div>

        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Specialization</label>
            <Input
              placeholder="e.g. Cardiologist, Dentist"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              required
              icon={Stethoscope}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Years of Experience</label>
            <Input
              type="number"
              placeholder="e.g. 5"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              required
              icon={Clock}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Qualifications</label>
            <Input
              placeholder="e.g. MBBS, MD"
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              required
              icon={Award}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Bio (Optional)</label>
            <textarea
              placeholder="Brief description about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)',
                backgroundColor: theme === 'light' ? 'white' : 'rgba(15, 23, 42, 0.6)',
                color: theme === 'light' ? '#0f172a' : '#f1f5f9',
                outline: 'none',
                minHeight: '100px'
              }}
            />
          </div>

          <Button type="submit" isLoading={loading} fullWidth>
            Save & Continue
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterDoctorSetupPage;