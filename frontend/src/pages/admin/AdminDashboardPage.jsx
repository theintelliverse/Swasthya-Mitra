import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import { Building2, Users, Activity, AlertCircle } from 'lucide-react';

const AdminDashboardPage = () => {
  return (
    <Layout role="admin">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>System Overview</h1>
        <p style={{ color: 'var(--slate-500)' }}>Monitor clinic performance and system health.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--primary-100)', borderRadius: 'var(--radius-md)', color: 'var(--primary-600)' }}>
              <Building2 size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>Total Clinics</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>5</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--secondary-100)', borderRadius: 'var(--radius-md)', color: 'var(--secondary-600)' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>Active Doctors</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>12</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--success)', borderRadius: 'var(--radius-md)', color: 'white' }}>
              <Activity size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>System Health</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Good</h3>
            </div>
          </div>
        </Card>
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Alerts</h3>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--slate-100)' }}>
          <AlertCircle size={20} color="var(--warning)" />
          <div>
            <p style={{ fontWeight: 600 }}>High Wait Time - Clinic A</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Average wait time exceeded 45 mins.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <AlertCircle size={20} color="var(--info)" />
          <div>
            <p style={{ fontWeight: 600 }}>New Clinic Registration</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>"City Care Polyclinic" requested access.</p>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default AdminDashboardPage;