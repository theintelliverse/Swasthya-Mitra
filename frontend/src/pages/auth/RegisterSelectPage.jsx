import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, Users, ArrowRight, Home } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

/**
 * RegisterSelectPage Component
 * 
 * Role selection page for registration.
 * Users choose between Patient, Doctor, or Staff registration.
 */
const RegisterSelectPage = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'patient',
            title: 'Patient Registration',
            description: 'Register as a patient to book appointments and manage your health records',
            icon: User,
            color: 'var(--primary-600)',
            bgColor: 'var(--primary-100)',
            path: '/register/patient'
        },
        {
            id: 'doctor',
            title: 'Doctor Registration',
            description: 'Register as a doctor to manage appointments, patients, and consultations',
            icon: Stethoscope,
            color: 'var(--secondary-600)',
            bgColor: 'var(--secondary-100)',
            path: '/register/doctor'
        },
        {
            id: 'staff',
            title: 'Staff Registration',
            description: 'Register as clinic staff to manage queues, appointments, and operations',
            icon: Users,
            color: 'var(--info)',
            bgColor: '#dbeafe',
            path: '/register/staff'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
            padding: '2rem 1rem',
            position: 'relative'
        }}>
            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    backgroundColor: 'white',
                    color: 'var(--slate-700)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-normal)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
            >
                <Home size={18} />
                Back to Home
            </button>

            <div style={{ width: '100%', maxWidth: '1000px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--slate-900)' }}>
                        Create Your Account
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                        Choose your role to get started with Swasthya-Mitra
                    </p>
                </div>

                {/* Role Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    {roles.map((role) => (
                        <Card
                            key={role.id}
                            glass
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all var(--transition-normal)',
                                border: '2px solid transparent'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                e.currentTarget.style.borderColor = role.color;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                            onClick={() => navigate(role.path)}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: role.bgColor,
                                color: role.color,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <role.icon size={40} />
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                color: 'var(--slate-900)'
                            }}>
                                {role.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--slate-600)',
                                marginBottom: '1.5rem',
                                lineHeight: 1.6
                            }}>
                                {role.description}
                            </p>

                            {/* Button */}
                            <Button
                                variant="outline"
                                style={{
                                    width: '100%',
                                    borderColor: role.color,
                                    color: role.color
                                }}
                            >
                                Register <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Login Link */}
                <p style={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'var(--slate-600)'
                }}>
                    Already have an account?{' '}
                    <a
                        href="/login"
                        style={{
                            color: 'var(--primary-600)',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterSelectPage;
