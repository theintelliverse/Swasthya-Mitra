import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Clock, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const DoctorQueuePage = () => {
  const { theme } = useTheme();
  const { user, selectedProfile, clinics } = useAuth();
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to get current clinic ID - assuming first clinic for now or from profile
  const clinicId = clinics?.[0]?.id || selectedProfile?.clinicId;

  const fetchQueueStatus = async () => {
    if (!clinicId || !selectedProfile?.id) return;

    setLoading(true);
    try {
      const data = await api.queue.getStatus(clinicId, selectedProfile.id);
      setQueueStatus(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch queue status", err);
      setError("Failed to load queue status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    // Poll every 30 seconds
    const interval = setInterval(fetchQueueStatus, 30000);
    return () => clearInterval(interval);
  }, [clinicId, selectedProfile?.id]);

  const handleNext = async () => {
    setActionLoading(true);
    try {
      await api.queue.next(clinicId, selectedProfile.id);
      await fetchQueueStatus();
    } catch (err) {
      setError("Failed to call next patient.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSkip = async (queueId) => {
    if (!queueId) return;
    setActionLoading(true);
    try {
      await api.queue.skip(queueId);
      await fetchQueueStatus();
    } catch (err) {
      setError("Failed to skip patient.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async (queueId) => {
    if (!queueId) return;
    setActionLoading(true);
    try {
      await api.queue.complete(queueId);
      await fetchQueueStatus();
    } catch (err) {
      setError("Failed to complete patient.");
    } finally {
      setActionLoading(false);
    }
  };

  const currentPatient = queueStatus?.current;
  const waitingList = queueStatus?.waiting || [];

  return (
    <Layout role="doctor">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Patient Queue
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Manage your daily appointments and walk-ins.
          </p>
        </div>
        <Button onClick={fetchQueueStatus} variant="outline" disabled={loading}>
          <RefreshCw size={20} style={{ marginRight: '0.5rem' }} className={loading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Current Patient Card */}
          <Card style={{
            border: '2px solid var(--primary-500)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'var(--primary-500)',
              color: 'white',
              padding: '0.25rem 1rem',
              borderBottomLeftRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              IN CONSULTATION
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Current Patient</h3>

            {currentPatient ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 700
                  }}>
                    {currentPatient.tokenNumber || '#'}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>
                      {currentPatient.patientName || 'Unknown Patient'}
                    </h2>
                    <p style={{ fontSize: '1rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                      {currentPatient.age ? `${currentPatient.age} yrs` : ''} • {currentPatient.gender || ''} • {currentPatient.phone || ''}
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(103, 232, 249, 0.05)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <p style={{ fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1', marginBottom: '0.25rem' }}>Reason for Visit</p>
                  <p style={{ fontWeight: 500 }}>{currentPatient.reason || 'General Checkup'}</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <Button
                    onClick={() => handleComplete(currentPatient._id)}
                    isLoading={actionLoading}
                    style={{ flex: 1 }}
                  >
                    <CheckCircle size={20} style={{ marginRight: '0.5rem' }} />
                    Complete Consultation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSkip(currentPatient._id)}
                    isLoading={actionLoading}
                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                  >
                    <XCircle size={20} style={{ marginRight: '0.5rem' }} />
                    Skip
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.7 }}>
                <Users size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                <p>No patient currently in consultation.</p>
                <Button
                  onClick={handleNext}
                  isLoading={actionLoading}
                  style={{ marginTop: '1.5rem' }}
                  disabled={waitingList.length === 0}
                >
                  Call Next Patient <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Button>
              </div>
            )}
          </Card>

          {/* Waiting List */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Waiting List</h3>
              <span style={{
                backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                {waitingList.length} Waiting
              </span>
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
                      <span>10m</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>No patients in waiting list.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Stats / Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Session Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#f0fdfa' : 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-600)' }}>{queueStatus?.completed?.length || 0}</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Completed</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#fef2f2' : 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444' }}>{queueStatus?.skipped?.length || 0}</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Skipped</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorQueuePage;