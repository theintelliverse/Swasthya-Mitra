import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Plus, FileText, Utensils } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const PatientDashboardPage = () => {
  const { theme } = useTheme();
  const { selectedProfile, user } = useAuth();

  const [upcoming, setUpcoming] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // 1️⃣ Upcoming appointment
        const apptRes = await api.appointment.myAppointments('?upcoming=true');
        const appt = apptRes?.appointments?.[0] || null;
        setUpcoming(appt);

        // 2️⃣ Queue status (only if appointment exists)
        if (appt) {
          const queueRes = await api.queue.patientStatus(
            appt.clinicId,
            appt.doctorUserId,
            appt.patientProfileId
          );
          setQueueStatus(queueRes);
        }
      } catch (err) {
        console.error('[PATIENT DASHBOARD] load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <Layout role="patient">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Hello, {selectedProfile?.name || user?.phone || 'Patient'}
          </h1>

          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1'
          }}>
            Manage your health and appointments.
          </p>
        </div>

        <Button>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Book Appointment
        </Button>
      </div>

      {/* UPCOMING APPOINTMENT */}
      <div className="dashboard-grid-2-1">
        <div>
          <Card glass style={{
            background: upcoming
              ? 'linear-gradient(135deg, #0891b2 0%, #155e75 100%)'
              : undefined,
            color: upcoming ? 'white' : undefined
          }}>
            {loading ? (
              <p>Loading appointment...</p>
            ) : upcoming ? (
              <>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  UPCOMING
                </span>

                <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                  {upcoming.clinicName || 'Clinic'}
                </h2>

                <p style={{ opacity: 0.9 }}>
                  {upcoming.type} • {upcoming.startTime
                    ? new Date(upcoming.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : ''}
                </p>

                {queueStatus && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                    <div>
                      <p style={{ opacity: 0.7 }}>Queue Position</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {queueStatus.position ?? '-'}
                      </p>
                    </div>
                    <div>
                      <p style={{ opacity: 0.7 }}>Est. Wait</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {queueStatus.estimatedWaitMinutes
                          ? `${queueStatus.estimatedWaitMinutes} mins`
                          : '-'}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>No upcoming appointments</p>
            )}
          </Card>

          {/* HEALTH RECORDS (STATIC FOR NOW) */}
          <h3 style={{
            fontSize: '1.25rem',
            marginTop: '2rem'
          }}>
            Health Records
          </h3>

          <Card>
            <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
              <FileText size={20} />
              <div>
                <p style={{ fontWeight: 600 }}>Blood Test Report</p>
                <p style={{ fontSize: '0.875rem' }}>Sample record</p>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <Card style={{ backgroundColor: '#059669', color: 'white' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <Utensils size={20} />
              <h3>Diet Plan</h3>
            </div>
            <ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem' }}>
              <li>Breakfast: Oatmeal</li>
              <li>Lunch: Dal, Roti</li>
              <li>Dinner: Veggies</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboardPage;
