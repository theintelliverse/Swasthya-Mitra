import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Clock, Activity, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  const { theme } = useTheme();
  
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>{value}</h3>
          <p style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {subtitle}
          </p>
        </div>
        {Icon && (
          <div style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: theme === 'light' 
              ? `var(--${color}-50)` 
              : 'rgba(103, 232, 249, 0.1)',
            color: theme === 'light' 
              ? `var(--${color}-600)` 
              : '#67e8f9'
          }}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

const DoctorDashboardPage = () => {
  const [isEmergency, setIsEmergency] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const toggleEmergency = async () => {
    setIsLoading(true);
    // Simulate API call
    await api.doctor.toggleEmergency(!isEmergency);
    setIsEmergency(!isEmergency);
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <h1 style={{ 
            fontSize: '1.875rem', 
            marginBottom: '0.5rem', 
            color: theme === 'light' ? '#0f172a' : '#f1f5f9' 
          }}>
            {t('goodMorning')}, Dr. Sharma
          </h1>
          <p style={{ 
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Here's what's happening in your clinic today.
          </p>
        </div>
        <Button
          variant={isEmergency ? 'danger' : 'outline'}
          onClick={toggleEmergency}
          isLoading={isLoading}
          style={{ gap: '0.5rem' }}
        >
          <AlertTriangle size={20} />
          {isEmergency ? t('stopEmergency') : t('triggerEmergency')}
        </Button>
      </div>

      {isEmergency && (
        <div style={{
          backgroundColor: theme === 'light' ? '#fef2f2' : 'rgba(220, 38, 38, 0.1)',
          border: theme === 'light' ? '1px solid #fecaca' : '1px solid rgba(220, 38, 38, 0.3)',
          color: theme === 'light' ? '#991b1b' : '#fca5a5',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <AlertTriangle size={24} />
          <div>
            <p style={{ fontWeight: 600 }}>{t('emergencyMode')} Active</p>
            <p style={{ fontSize: '0.875rem' }}>Queue is paused. Patients are being notified of delays.</p>
          </div>
        </div>
      )}

      <div className="dashboard-stat-grid">
        <StatCard title={t('patientsQueue')} value="12" subtitle="+4 since last hour" icon={Users} color="primary" />
        <StatCard title={t('avgWaitTime')} value={isEmergency ? 'Paused' : '18m'} subtitle="-2m than yesterday" icon={Clock} color="warning" />
        <StatCard title="Total Patients" value="45" subtitle="Today's total" icon={Activity} color="secondary" />
        <StatCard title="Appointments" value="8" subtitle="Scheduled for today" icon={Calendar} color="info" />
      </div>

      <div className="dashboard-grid-2-1">
        <Card>
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          color: theme === 'light' ? '#0f172a' : '#f1f5f9' 
        }}>
          Current Queue
        </h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="queue-item" style={{
                backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)',
                border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: theme === 'light' ? 'var(--primary-100)' : 'rgba(103, 232, 249, 0.2)',
                    color: theme === 'light' ? 'var(--primary-700)' : '#67e8f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {i}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Ramesh Kumar</h4>
                    <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Fever & Cold • +91 98765 43210</p>
                  </div>
                </div>
                <Button size="sm" disabled={isEmergency}>
                  Call Next <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button variant="outline" style={{ justifyContent: 'flex-start' }}>Add Walk-in Patient</Button>
            <Button variant="outline" style={{ justifyContent: 'flex-start' }}>Create Appointment</Button>
            <Button variant="outline" style={{ justifyContent: 'flex-start' }}>View Reports</Button>
            <Button variant="outline" style={{ justifyContent: 'flex-start' }}>Manage Schedule</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DoctorDashboardPage;