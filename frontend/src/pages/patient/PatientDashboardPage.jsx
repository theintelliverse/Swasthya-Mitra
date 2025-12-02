import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, Clock, MapPin, Plus, FileText, Activity, Utensils } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const PatientDashboardPage = () => {
  const { theme } = useTheme();
  const { selectedProfile, user } = useAuth();

  return (
    <Layout role="patient">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>Hello, {selectedProfile?.name || user?.phone || 'Patient'}</h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>Manage your health and appointments.</p>
        </div>
        <Button>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Book Appointment
        </Button>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card glass style={{ background: 'linear-gradient(135deg, #0891b2 0%, #155e75 100%)', color: 'white', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  UPCOMING
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', color: 'white' }}>Dr. Sharma's Clinic</h2>
                <p style={{ opacity: 0.9, marginTop: '0.25rem' }}>General Physician • Token #12</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>10:30 AM</h3>
                <p style={{ opacity: 0.9 }}>Today</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
              <div>
                <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>Estimated Wait</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>15 mins</p>
              </div>
              <div>
                <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>Queue Position</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>3rd in line</p>
              </div>
            </div>
          </Card>

          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: theme === 'light' ? '#0f172a' : '#f1f5f9',
            marginTop: '1.5rem'
          }}>Health Records</h3>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: theme === 'light' ? '#f0fdfa' : 'rgba(103, 232, 249, 0.1)',
                  color: theme === 'light' ? '#0891b2' : '#67e8f9',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Blood Test Report</p>
                  <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>12 Oct, 2023 • Dr. Sharma</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: theme === 'light' ? '#f0fdfa' : 'rgba(103, 232, 249, 0.1)',
                  color: theme === 'light' ? '#0891b2' : '#67e8f9',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Prescription - Fever</p>
                  <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>05 Sep, 2023 • Dr. Anjali</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Health Vitals</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)', borderRadius: 'var(--radius-md)', border: theme === 'dark' ? '1px solid rgba(103, 232, 249, 0.1)' : 'none' }}>
                <p style={{ fontSize: '0.75rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Blood Pressure</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>120/80</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)', borderRadius: 'var(--radius-md)', border: theme === 'dark' ? '1px solid rgba(103, 232, 249, 0.1)' : 'none' }}>
                <p style={{ fontSize: '0.75rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Heart Rate</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>72 bpm</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)', borderRadius: 'var(--radius-md)', border: theme === 'dark' ? '1px solid rgba(103, 232, 249, 0.1)' : 'none' }}>
                <p style={{ fontSize: '0.75rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Weight</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>70 kg</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)', borderRadius: 'var(--radius-md)', border: theme === 'dark' ? '1px solid rgba(103, 232, 249, 0.1)' : 'none' }}>
                <p style={{ fontSize: '0.75rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Height</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>175 cm</p>
              </div>
            </div>
          </Card>

          <Card style={{ backgroundColor: '#059669', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Utensils size={20} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Diet Plan</h3>
            </div>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Today's Goal: Low Sodium</p>
            <ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem', opacity: 0.9 }}>
              <li>Breakfast: Oatmeal with fruits</li>
              <li>Lunch: Dal, Roti, Salad</li>
              <li>Dinner: Grilled Veggies</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboardPage;