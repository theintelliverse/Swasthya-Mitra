import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, Clock, MapPin, Plus, FileText, Activity, Utensils } from 'lucide-react';

const PatientDashboardPage = () => {
  return (
    <Layout role="patient">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Hello, Rajesh</h1>
          <p style={{ color: 'var(--slate-600)' }}>Manage your health and appointments.</p>
        </div>
        <Button>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Book Appointment
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card glass style={{ background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)', color: 'white', border: 'none' }}>
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

          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Health Records</h3>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--slate-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)', borderRadius: 'var(--radius-md)' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>Blood Test Report</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>12 Oct, 2023 • Dr. Sharma</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)', borderRadius: 'var(--radius-md)' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>Prescription - Fever</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>05 Sep, 2023 • Dr. Anjali</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Health Vitals</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Blood Pressure</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>120/80</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Heart Rate</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>72 bpm</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Weight</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>70 kg</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Height</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>175 cm</p>
              </div>
            </div>
          </Card>

          <Card style={{ backgroundColor: 'var(--success)', color: 'white' }}>
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