import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Stethoscope, Clock, Award, Save } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const DoctorProfilePage = () => {
  const { theme } = useTheme();
  const { user, selectedProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: selectedProfile?.name || user?.name || '',
    specialization: 'General Physician', // Mock default
    experience: '5',
    qualifications: 'MBBS',
    bio: 'Dedicated to patient care.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <Layout role="doctor">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            My Profile
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Manage your professional details.
          </p>
        </div>
        <Button onClick={() => isEditing ? document.getElementById('doc-profile-form').requestSubmit() : setIsEditing(true)}>
          {isEditing ? <><Save size={20} style={{ marginRight: '0.5rem' }} /> Save Changes</> : 'Edit Profile'}
        </Button>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <form id="doc-profile-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-600)'
                }}>
                  <User size={40} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>
                    {formData.name}
                  </h3>
                  <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Doctor</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    icon={User}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Specialization</label>
                  <Input
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    disabled={!isEditing}
                    icon={Stethoscope}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Experience (Years)</label>
                  <Input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    disabled={!isEditing}
                    icon={Clock}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Qualifications</label>
                  <Input
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    disabled={!isEditing}
                    icon={Award}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
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
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfilePage;