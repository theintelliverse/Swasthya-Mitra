import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const DoctorPatientHistoryPage = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const history = [
    { id: 1, patientName: 'Rahul Kumar', date: '2023-10-25', diagnosis: 'Viral Fever', prescription: 'Paracetamol, Rest' },
    { id: 2, patientName: 'Anita Singh', date: '2023-10-24', diagnosis: 'Migraine', prescription: 'Painkillers' },
    { id: 3, patientName: 'Rahul Kumar', date: '2023-09-15', diagnosis: 'Common Cold', prescription: 'Cetirizine' },
  ];

  const filteredHistory = history.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role="doctor">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Patient History
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            View past consultations and medical records.
          </p>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ marginBottom: '1.5rem' }}>
              <Input
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredHistory.length > 0 ? (
                filteredHistory.map(record => (
                  <div key={record.id} style={{
                    padding: '1rem',
                    border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(15, 23, 42, 0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <User size={16} /> {record.patientName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}>
                        <Calendar size={14} /> {record.date}
                      </div>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 500 }}>Diagnosis:</span> {record.diagnosis}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                      <span style={{ fontWeight: 500 }}>Prescription:</span> {record.prescription}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>No records found.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorPatientHistoryPage;