import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Users, Clock, RefreshCw, Search, RotateCcw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const ManageQueuePage = () => {
  const { theme } = useTheme();
  const { clinics } = useAuth();
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [error, setError] = useState(null);

  // Helper to get current clinic ID
  const clinicId = clinics?.[0]?.clinicId?._id || clinics?.[0]?.clinicId;

  const fetchQueueStatus = async () => {
    if (!clinicId || !doctorId) {
      setError("Please enter a Doctor ID to view the queue.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.queue.getStatus(clinicId, doctorId);
      setQueueStatus(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch queue status", err);
      setError("Failed to load queue status. Check Doctor ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecall = async (queueId) => {
    try {
      await api.queue.recall(queueId);
      fetchQueueStatus();
    } catch (err) {
      setError("Failed to recall patient.");
    }
  };

  const waitingList = queueStatus?.waiting || [];
  const skippedList = queueStatus?.skipped || []; // Backend might not return skipped in /status? Need to check.
  // Actually backend /status returns { waiting, current, count }. It does NOT return skipped.
  // I need to check if I can get skipped patients.
  // The backend `queue/status` only returns `waiting` and `current`.
  // So I cannot show skipped list unless I modify backend or use another endpoint.
  // But I am not allowed to modify backend logic significantly?
  // Wait, I can't see skipped patients with current API.
  // So "Recall" functionality might be limited to... knowing the ID?
  // Or maybe I can't implement Recall UI properly without the list.

  // Let's check backend app.js again for /queue/status
  // It returns: res.json({ waiting, current, count });
  // It does NOT return skipped.

  // So I can only show Waiting and Current.
  // I will implement that for now.

  return (
    <Layout role="staff">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Manage Queue
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Monitor and manage patient queues.
          </p>
        </div>
      </div>

      <Card style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Doctor ID
            </label>
            <Input
              placeholder="Enter Doctor User ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />
          </div>
          <Button onClick={fetchQueueStatus} disabled={loading}>
            <Search size={20} style={{ marginRight: '0.5rem' }} />
            Load Queue
          </Button>
        </div>
        {error && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.875rem' }}>{error}</p>}
      </Card>

      {queueStatus && (
        <div className="dashboard-grid-2-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Waiting List</h3>
                <Button variant="ghost" size="sm" onClick={fetchQueueStatus}>
                  <RefreshCw size={16} />
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {waitingList.length > 0 ? (
                  waitingList.map((patient, index) => (
                    <div key={patient._id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)',
                      borderRadius: 'var(--radius-md)',
                      border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.875rem'
                        }}>
                          {patient.tokenNumber || index + 1}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>{patient.patientName}</p>
                          <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>{patient.reason || 'General Checkup'}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                        <Clock size={14} />
                        <span>Waiting</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>No patients in waiting list.</p>
                )}
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Current Status</h3>
              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: theme === 'light' ? '#f0fdfa' : 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>Currently Serving</p>
                {queueStatus.current ? (
                  <>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-600)' }}>{queueStatus.current.patientName}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>Token #{queueStatus.current.tokenNumber}</p>
                  </>
                ) : (
                  <p style={{ fontSize: '1.25rem', fontWeight: 600, opacity: 0.6 }}>None</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageQueuePage;