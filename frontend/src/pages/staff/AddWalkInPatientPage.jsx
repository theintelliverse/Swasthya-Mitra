import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddWalkInPatientPage = () => {
  const { theme } = useTheme();
  const { clinics } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    reason: '',
    doctorId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Helper to get current clinic ID
  const clinicId = clinics?.[0]?.clinicId?._id || clinics?.[0]?.clinicId;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!clinicId) {
      setError("No clinic associated with this staff account.");
      setLoading(false);
      return;
    }

    try {
      // 1. Register the patient (or find if exists - but we only have register for now)
      // We'll use a default password for walk-ins
      const registerData = {
        name: formData.name,
        phone: formData.phone,
        password: 'password123', // Default password
        email: `${formData.phone}@temp.com` // Dummy email if needed, or optional
      };

      let patientProfileId = null;

      try {
        const regResponse = await api.auth.register(registerData);
        patientProfileId = regResponse.profileId;
      } catch (regError) {
        // If registration fails, maybe user exists?
        // We can't easily handle "User exists" without a search/login flow.
        // For now, show error.
        throw new Error(regError.message || "Registration failed. Patient might already exist.");
      }

      // 2. Add to Queue
      if (patientProfileId) {
        await api.queue.add(
          clinicId,
          formData.doctorId,
          patientProfileId,
          null // appointmentId
        );
        setSuccess(`Patient ${formData.name} added to queue successfully!`);
        // Reset form
        setFormData({
          name: '',
          phone: '',
          age: '',
          gender: 'Male',
          reason: '',
          doctorId: formData.doctorId // Keep doctor ID
        });
      }

    } catch (err) {
      console.error("Add walk-in error", err);
      setError(err.message || "Failed to add patient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="staff">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Add Walk-in Patient
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Register and add a new patient to the queue.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/staff-dashboard')}>
          <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
          Back to Dashboard
        </Button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && (
              <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 'var(--radius-md)' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ padding: '1rem', backgroundColor: '#f0fdfa', color: '#115e59', borderRadius: 'var(--radius-md)' }}>
                {success}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Patient Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Age</label>
                <Input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Reason for Visit</label>
              <Input name="reason" value={formData.reason} onChange={handleChange} placeholder="e.g., Fever, Checkup" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Assign to Doctor (User ID)</label>
              <Input name="doctorId" value={formData.doctorId} onChange={handleChange} required placeholder="Doctor's User ID" />
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Enter the User ID of the doctor to add to their queue.</p>
            </div>

            <Button type="submit" isLoading={loading} style={{ marginTop: '1rem' }}>
              <UserPlus size={20} style={{ marginRight: '0.5rem' }} />
              Add to Queue
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AddWalkInPatientPage;