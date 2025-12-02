import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

const SelectProfilePage = () => {
  const navigate = useNavigate();
  const { profiles, selectProfile } = useAuth();

  const handleSelect = (profile) => {
    selectProfile(profile);

    // Navigate based on role
    const role = profile.patientType || 'patient';
    if (role === 'doctor') navigate('/doctor/dashboard');
    else if (role === 'staff') navigate('/staff/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/patient/dashboard');
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
      <Card glass className="w-full max-w-md" style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Select Profile</h1>
          <p style={{ color: 'var(--slate-600)' }}>Choose which profile you want to continue with.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {profiles.map((profile) => (
            <button
              key={profile._id}
              onClick={() => handleSelect(profile)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'white',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-500)';
                e.currentTarget.style.backgroundColor = 'var(--primary-50)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--slate-200)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-100)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{profile.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                    {profile.patientType ? profile.patientType.charAt(0).toUpperCase() + profile.patientType.slice(1) : 'Patient'}
                  </p>
                </div>
              </div>
              <ArrowRight size={20} color="var(--slate-400)" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SelectProfilePage;