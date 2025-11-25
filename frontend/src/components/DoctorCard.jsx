import React from 'react';
import Card from '../components/ui/Card';
import { User } from 'lucide-react';

/**
 * Simple card displaying a doctor's basic info.
 * Props:
 *   name: string – Doctor's full name
 *   specialization: string – e.g. "Cardiologist"
 *   clinic: string – Hospital/clinic name
 *   avatarUrl?: string – optional image URL
 */
const DoctorCard = ({ name, specialization, clinic, avatarUrl }) => {
    return (
        <Card glass style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={name}
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    />
                ) : (
                    <User size={48} color="var(--primary-600)" />
                )}
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--slate-800)' }}>{name}</h3>
                    <p style={{ margin: 0, color: 'var(--slate-600)' }}>{specialization}</p>
                    <p style={{ margin: 0, color: 'var(--slate-500)' }}>{clinic}</p>
                </div>
            </div>
        </Card>
    );
};

export default DoctorCard;
