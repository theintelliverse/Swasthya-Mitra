import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Search, User, Phone, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const PatientSearchPage = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API search
    setTimeout(() => {
      if (searchTerm.trim()) {
        setResults([
          { id: 1, name: 'Rahul Kumar', phone: '9876543210', age: 30, gender: 'Male' },
          { id: 2, name: 'Priya Sharma', phone: '9876543211', age: 25, gender: 'Female' }
        ]);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <Layout role="staff">
      <div className="dashboard-header">
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            marginBottom: '0.5rem',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9'
          }}>
            Search Patients
          </h1>
          <p style={{
            color: theme === 'light' ? '#64748b' : '#cbd5e1',
            fontSize: '1rem'
          }}>
            Find patient records by name or phone number.
          </p>
        </div>
      </div>

      <div className="dashboard-grid-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="Enter name or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              <Button type="submit" isLoading={loading}>
                Search
              </Button>
            </form>
          </Card>

          {results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map(patient => (
                <Card key={patient.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <User size={24} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>{patient.name}</h3>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={14} /> {patient.phone}</span>
                          <span>{patient.age} yrs, {patient.gender}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientSearchPage;