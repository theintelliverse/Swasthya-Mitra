import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Users, UserPlus, Shield } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const ManageStaffPage = () => {
  const { theme } = useTheme();
  const { clinics } = useAuth();

  const [formData, setFormData] = useState({
    userId: '',
    clinicId: clinics?.[0]?.clinicId?._id || clinics?.[0]?.clinicId || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.clinic.addUser(formData.clinicId, formData.userId, 'staff', ['manage_queue']);
      setMessage({ type: 'success', text: 'Staff added successfully!' });
      setFormData({ ...formData, userId: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to add staff.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="admin">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Manage Staff
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Assign staff members to your clinics.
          </p>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Add New Staff</h3>

            {message.text && (
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
                backgroundColor: message.type === 'success' ? '#f0fdfa' : '#fee2e2',
                color: message.type === 'success' ? '#115e59' : '#991b1b'
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleAddStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Select Clinic</label>
                <select
                  value={formData.clinicId}
                  onChange={(e) => setFormData({ ...formData, clinicId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)',
                    backgroundColor: theme === 'light' ? 'white' : 'rgba(15, 23, 42, 0.6)',
                    color: theme === 'light' ? '#0f172a' : '#f1f5f9',
                    outline: 'none'
                  }}
                  required
                >
                  <option value="">Select Clinic</option>
                  {clinics?.map(c => {
                    const clinic = c.clinicId || c;
                    return <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
                  })}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>User ID</label>
                <Input
                  placeholder="Enter User ID of the staff member"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  required
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                  The user must already be registered in the system.
                </p>
              </div>

              <Button type="submit" isLoading={loading}>
                <UserPlus size={20} style={{ marginRight: '0.5rem' }} />
                Add Staff Member
              </Button>
            </form>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Staff Roles</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <Shield size={20} color="var(--primary-500)" style={{ marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontWeight: 600 }}>Queue Manager</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Can add patients to queue and manage flow.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Users size={20} color="var(--primary-500)" style={{ marginTop: '0.25rem' }} />
              <div>
                <p style={{ fontWeight: 600 }}>Receptionist</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Can register new patients and book appointments.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ManageStaffPage;