import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Settings, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const ManageClinicSettingsPage = () => {
  const { theme } = useTheme();
  const { clinics } = useAuth();

  // Mock state, ideally fetch from API
  const [clinicData, setClinicData] = useState({
    name: clinics?.[0]?.clinicId?.name || 'My Clinic',
    address: clinics?.[0]?.clinicId?.address || '',
    emergencyMode: false,
    openingTime: '09:00',
    closingTime: '18:00'
  });

  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved!');
    }, 1000);
  };

  const toggleEmergency = () => {
    setClinicData(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
    // API call to toggle emergency mode would go here
  };

  return (
    <Layout role="admin">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Clinic Settings
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Manage general settings and emergency mode.
          </p>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>General Information</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Clinic Name</label>
                <Input
                  value={clinicData.name}
                  onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Address</label>
                <Input
                  value={clinicData.address}
                  onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                  icon={MapPin}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Opening Time</label>
                  <Input
                    type="time"
                    value={clinicData.openingTime}
                    onChange={(e) => setClinicData({ ...clinicData, openingTime: e.target.value })}
                    icon={Clock}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Closing Time</label>
                  <Input
                    type="time"
                    value={clinicData.closingTime}
                    onChange={(e) => setClinicData({ ...clinicData, closingTime: e.target.value })}
                    icon={Clock}
                  />
                </div>
              </div>
              <Button type="submit" isLoading={loading} style={{ alignSelf: 'flex-start' }}>
                Save Changes
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <Card style={{ border: '2px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <AlertTriangle size={32} color="#ef4444" />
              <h3 style={{ fontSize: '1.25rem', color: '#ef4444' }}>Emergency Mode</h3>
            </div>
            <p style={{ marginBottom: '1.5rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
              Activating emergency mode will prioritize critical cases and notify all staff.
            </p>
            <Button
              onClick={toggleEmergency}
              style={{
                width: '100%',
                backgroundColor: clinicData.emergencyMode ? '#ef4444' : 'transparent',
                border: '2px solid #ef4444',
                color: clinicData.emergencyMode ? 'white' : '#ef4444'
              }}
            >
              {clinicData.emergencyMode ? 'Stop Emergency Mode' : 'Trigger Emergency Mode'}
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ManageClinicSettingsPage;