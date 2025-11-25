import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Clock, UserPlus, Search, ArrowRight, Activity, Calendar } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  const { theme } = useTheme();
  
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: theme === 'light' ? '#1e293b' : '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem', color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>{value}</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: theme === 'light' ? '#1e293b' : '#cbd5e1' }}>
            {subtitle}
          </p>
        </div>
        {Icon && (
          <div style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: `var(--${color}-50)`,
            color: `var(--${color}-600)`
          }}>
            <Icon size={24} />
          </div>
        )}
        <div style={{
          padding: '0.75rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: `var(--${color}-50)`,
          color: `var(--${color}-600)`
        }}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

const StaffDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  return (
    <Layout role="staff">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>Good Morning, Priya</h1>
          <p style={{ color: theme === 'light' ? '#1e293b' : '#cbd5e1' }}>Manage patient queues and clinic operations.</p>
        </div>
        <Button>
          <UserPlus size={20} style={{ marginRight: '0.5rem' }} />
          Add Walk-in Patient
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="In Queue" value="12" subtitle="+3 new patients" icon={Users} color="primary" />
        <StatCard title="Avg Wait Time" value="18m" subtitle="Better than usual" icon={Clock} color="warning" />
        <StatCard title="Checked In" value="28" subtitle="Today's total" icon={Activity} color="success" />
        <StatCard title="Appointments" value="15" subtitle="Scheduled today" icon={Calendar} color="secondary" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>Current Queue</h3>
              <Button variant="outline" size="sm">Manage Queue</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Ramesh Kumar', token: 1, phone: '+91 98765 43210', reason: 'General Checkup', status: 'In Progress' },
                { name: 'Sita Devi', token: 2, phone: '+91 98765 43211', reason: 'Follow-up', status: 'Waiting' },
                { name: 'Arjun Singh', token: 3, phone: '+91 98765 43212', reason: 'Fever & Cold', status: 'Waiting' }
              ].map((patient) => (
                <div key={patient.token} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-md)',
                  border: patient.status === 'In Progress' ? '2px solid var(--primary-500)' : '1px solid var(--slate-100)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: patient.status === 'In Progress' ? 'var(--primary-500)' : 'var(--primary-100)',
                      color: patient.status === 'In Progress' ? 'white' : 'var(--primary-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700
                    }}>
                      {patient.token}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>{patient.name}</h4>
                      <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#1e293b' : '#cbd5e1' }}>
                        {patient.reason} • {patient.phone}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button size="sm" variant="outline">Edit</Button>
                    {patient.status === 'In Progress' && (
                      <Button size="sm">
                        Complete <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>Patient Search</h3>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--slate-400)'
              }} />
              <input
                type="text"
                placeholder="Search by name, phone, or token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-200)',
                  backgroundColor: 'var(--slate-50)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
            <Button variant="outline" style={{ width: '100%' }}>
              Advanced Search
            </Button>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#e0e7ff' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button variant="outline" style={{ justifyContent: 'flex-start' }}>
                <UserPlus size={18} style={{ marginRight: '0.5rem' }} />
                Add Walk-in
              </Button>
              <Button variant="outline" style={{ justifyContent: 'flex-start' }}>
                <Calendar size={18} style={{ marginRight: '0.5rem' }} />
                Create Appointment
              </Button>
              <Button variant="outline" style={{ justifyContent: 'flex-start' }}>
                <Search size={18} style={{ marginRight: '0.5rem' }} />
                Find Patient
              </Button>
              <Button variant="outline" style={{ justifyContent: 'flex-start' }}>
                <Activity size={18} style={{ marginRight: '0.5rem' }} />
                View Queue
              </Button>
            </div>
          </Card>

          <Card style={{
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
            color: 'white',
            border: 'none'
          }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>Today's Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Walk-ins</span>
                <span style={{ fontWeight: 600 }}>15</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Appointments</span>
                <span style={{ fontWeight: 600 }}>13</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Completed</span>
                <span style={{ fontWeight: 600 }}>28</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontWeight: 600 }}>Total Patients</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>28</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StaffDashboardPage;