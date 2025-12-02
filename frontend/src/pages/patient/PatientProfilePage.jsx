import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Phone, Mail, MapPin, Calendar, Save } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const PatientProfilePage = () => {
  const { theme } = useTheme();
  const { user, selectedProfile } = useAuth();

  // Mock state for now, ideally we update user profile via API
  const [formData, setFormData] = useState({
    name: selectedProfile?.name || user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '', // Backend doesn't seem to have email in user model based on previous interactions, but let's keep it
    address: selectedProfile?.address || '',
    dob: selectedProfile?.dob || '',
    bloodGroup: selectedProfile?.bloodGroup || ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <Layout role="patient">
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
            Manage your personal information.
          </p>
        </div>
        <Button onClick={() => isEditing ? document.getElementById('profile-form').requestSubmit() : setIsEditing(true)}>
          {isEditing ? <><Save size={20} style={{ marginRight: '0.5rem' }} /> Save Changes</> : 'Edit Profile'}
        </Button>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <form id="profile-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Patient</p>
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
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={true} // Phone usually immutable or requires OTP
                    icon={Phone}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    disabled={!isEditing}
                    icon={Calendar}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)',
                      backgroundColor: theme === 'light' ? 'white' : 'rgba(15, 23, 42, 0.6)',
                      color: theme === 'light' ? '#0f172a' : '#f1f5f9',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  icon={MapPin}
                />
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Account Status</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Member Since</span>
              <span style={{ fontWeight: 500 }}>{new Date().toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Status</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientProfilePage;