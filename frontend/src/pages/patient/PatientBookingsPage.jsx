import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const PatientBookingsPage = () => {
  const { theme } = useTheme();

  // Mock Data
  const bookings = [
    { id: 1, doctor: 'Dr. Sharma', clinic: 'City Health Clinic', date: '2023-11-15', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. Verma', clinic: 'Care Plus Hospital', date: '2023-10-20', time: '02:00 PM', status: 'Completed' },
  ];

  return (
    <Layout role="patient">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            My Bookings
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            View your upcoming and past appointments.
          </p>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map(booking => (
            <Card key={booking.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: theme === 'light' ? 'var(--primary-100)' : 'rgba(103, 232, 249, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    color: theme === 'light' ? 'var(--primary-600)' : '#67e8f9',
                    height: 'fit-content'
                  }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>{booking.doctor}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {booking.clinic}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {booking.date} at {booking.time}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span style={{
                    backgroundColor: booking.status === 'Upcoming' ? '#dbeafe' : '#dcfce7',
                    color: booking.status === 'Upcoming' ? '#1e40af' : '#166534',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
          {bookings.length === 0 && (
            <Card>
              <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>No bookings found.</p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientBookingsPage;