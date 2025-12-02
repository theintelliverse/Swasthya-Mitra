import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Building2, Plus, MapPin, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ClinicListPage = () => {
  const { theme } = useTheme();
  const { clinics, user } = useAuth(); // Note: clinics from useAuth might be stale if we create new ones. 
  // Ideally we should fetch fresh list or update context. 
  // For now, we'll assume useAuth updates or we fetch locally if needed.
  // Actually, api.user.getMe() returns clinics.

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClinicData, setNewClinicData] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localClinics, setLocalClinics] = useState(clinics || []);

  useEffect(() => {
    if (clinics) {
      setLocalClinics(clinics);
    }
  }, [clinics]);

  const handleCreateClinic = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.clinic.create(newClinicData.name, newClinicData.address);
      // Refresh clinics - simplistic approach: reload page or fetch me
      // Since we don't have a global refresh, we'll just add to local state for now
      // But the object structure from create response might differ.
      // Response: { message, clinicId }
      // We need the full object to display. 
      // Let's just reload the page for now to sync with context.
      window.location.reload();
    } catch (err) {
      setError(err.message || "Failed to create clinic");
    } finally {
      setLoading(false);
    }
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
            Clinics
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Manage your clinics and hospitals.
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          {showCreateForm ? 'Cancel' : 'Add New Clinic'}
        </Button>
      </div>

      {showCreateForm && (
        <Card style={{ marginBottom: '2rem', border: '2px solid var(--primary-500)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>Register New Clinic</h3>
          <form onSubmit={handleCreateClinic} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}
            <Input
              placeholder="Clinic Name"
              value={newClinicData.name}
              onChange={(e) => setNewClinicData({ ...newClinicData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Address"
              value={newClinicData.address}
              onChange={(e) => setNewClinicData({ ...newClinicData, address: e.target.value })}
            />
            <Button type="submit" isLoading={loading} style={{ alignSelf: 'flex-start' }}>
              Create Clinic
            </Button>
          </form>
        </Card>
      )}

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {localClinics.length > 0 ? (
            localClinics.map((clinicItem) => {
              // Handle structure difference: clinicItem might be { clinicId: {...}, role: ... } or just clinic object
              const clinic = clinicItem.clinicId || clinicItem;
              return (
                <Card key={clinic._id || clinic.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        padding: '1rem',
                        backgroundColor: theme === 'light' ? 'var(--primary-100)' : 'rgba(103, 232, 249, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        color: theme === 'light' ? 'var(--primary-600)' : '#67e8f9',
                        height: 'fit-content'
                      }}>
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>{clinic.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                          <MapPin size={16} />
                          <span>{clinic.address || 'No address provided'}</span>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                          <span style={{
                            backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.1)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            Role: {clinicItem.role || 'Owner'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card>
              <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
                <Building2 size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                <p>No clinics found. Create one to get started.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClinicListPage;