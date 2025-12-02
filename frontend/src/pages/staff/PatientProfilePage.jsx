import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const StaffPatientProfilePage = () => {
  const { theme } = useTheme();

  // Mock Data - in real app, fetch based on ID in URL
  const patient = {
    name: 'Rahul Kumar',
    phone: '9876543210',
    age: 30,
    gender: 'Male',
    address: '123, Main Street, City',
    bloodGroup: 'O+'
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
            Patient Profile
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            View patient details and history.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline">View History</Button>
          <Button>Book Appointment</Button>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-600)'
              }}>
                <User size={50} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9', marginBottom: '0.5rem' }}>
                  {patient.name}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> {patient.phone}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {patient.age} yrs, {patient.gender}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {patient.address}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ActivityIcon /> Blood Group: {patient.bloodGroup}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Recent Visits</h3>
            <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>Viral Fever</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>2023-10-25</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Dr. Sharma - City Health Clinic</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);

export default StaffPatientProfilePage;