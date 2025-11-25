import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import { Building2, Users, Activity, AlertCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const AdminDashboardPage = () => {
  const { theme } = useTheme();
  
  return (
    <Layout role="admin">
      <div className="dashboard-header">
        <div>
          <h1 style={{ 
            fontSize: '1.875rem', 
            marginBottom: '0.5rem', 
            color: theme === 'light' ? '#0f172a' : '#f1f5f9' 
          }}>
            System Overview
          </h1>
          <p style={{ 
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Monitor clinic performance and system health.
          </p>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: theme === 'light' ? 'var(--primary-100)' : 'rgba(103, 232, 249, 0.1)', 
              borderRadius: 'var(--radius-md)', 
              color: theme === 'light' ? 'var(--primary-600)' : '#67e8f9' 
            }}>
              <Building2 size={24} />
            </div>
            <div>
              <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '0.875rem' }}>Total Clinics</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>5</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: theme === 'light' ? 'var(--secondary-100)' : 'rgba(103, 232, 249, 0.1)', 
              borderRadius: 'var(--radius-md)', 
              color: theme === 'light' ? 'var(--secondary-600)' : '#67e8f9' 
            }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '0.875rem' }}>Active Doctors</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>12</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'rgba(34, 197, 94, 0.2)', 
              borderRadius: 'var(--radius-md)', 
              color: '#22c55e' 
            }}>
              <Activity size={24} />
            </div>
            <div>
              <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '0.875rem' }}>System Health</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Good</h3>
            </div>
          </div>
        </Card>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Recent Alerts</h3>
      <Card>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          padding: '1rem', 
          borderBottom: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)' 
        }}>
          <AlertCircle size={20} color={theme === 'light' ? '#f59e0b' : '#fbbf24'} />
          <div>
            <p style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>High Wait Time - Clinic A</p>
            <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>Average wait time exceeded 45 mins.</p>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          padding: '1rem' 
        }}>
          <AlertCircle size={20} color={theme === 'light' ? '#3b82f6' : '#60a5fa'} />
          <div>
            <p style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>New Clinic Registration</p>
            <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>"City Care Polyclinic" requested access.</p>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default AdminDashboardPage;