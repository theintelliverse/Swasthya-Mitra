import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    LogOut,
    Stethoscope,
    ClipboardList,
    UserPlus,
    Building2,
    Menu,
    X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';

const Sidebar = ({ role = 'doctor' }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { t, getLogo } = useLanguage();
    const { theme } = useTheme();

    const getLinks = () => {
        switch (role) {
            case 'admin':
                return [
                    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin/dashboard' },
                    { icon: Users, label: t('patients'), path: '/admin/manage-staff' },
                    { icon: Stethoscope, label: 'Doctors', path: '/admin/manage-doctors' },
                    { icon: Building2, label: 'Clinics', path: '/admin/clinics' },
                    { icon: Settings, label: t('settings'), path: '/admin/settings' },
                ];
            case 'doctor':
                return [
                    { icon: LayoutDashboard, label: t('dashboard'), path: '/doctor/dashboard' },
                    { icon: ClipboardList, label: t('queue'), path: '/doctor/queue' },
                    { icon: Users, label: t('patients'), path: '/doctor/patient-history' },
                    { icon: Settings, label: t('profile'), path: '/doctor/profile' },
                ];
            case 'staff':
                return [
                    { icon: LayoutDashboard, label: t('dashboard'), path: '/staff/dashboard' },
                    { icon: UserPlus, label: t('patients'), path: '/staff/add-patient' },
                    { icon: ClipboardList, label: t('queue'), path: '/staff/manage-queue' },
                    { icon: Users, label: t('search'), path: '/staff/search' },
                ];
            case 'patient':
                return [
                    { icon: LayoutDashboard, label: t('dashboard'), path: '/patient/dashboard' },
                    { icon: Calendar, label: t('appointments'), path: '/patient/bookings' },
                    { icon: Settings, label: t('profile'), path: '/patient/profile' },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 60,
                    padding: '0.5rem',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    display: 'none', // Hidden on desktop via CSS media query ideally, but inline for now
                    '@media (max-width: 768px)': {
                        display: 'block'
                    }
                }}
                className="mobile-menu-btn"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    width: '260px',
                    height: '100vh',
                    background: theme === 'light'
                        ? '#ffffff'
                        : 'linear-gradient(135deg, #0f172a 0%, #1a2e4a 50%, #0d2a3d 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRight: theme === 'light'
                        ? '1px solid #e2e8f0'
                        : '1px solid rgba(103, 232, 249, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 50,
                    transition: 'transform var(--transition-normal)',
                    // Transform logic handled by CSS class in index.css for cleaner responsive behavior
                }}
            >
                <div style={{ padding: '1.5rem', borderBottom: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img 
                            src={getLogo()} 
                            alt={t('appName')} 
                            style={{ height: '40px', width: 'auto' }}
                            onError={(e) => {
                                e.target.src = '/assets/logo-en.svg';
                            }}
                        />
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)} // Close on click mobile
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                color: isActive ? 'var(--primary-700)' : 'var(--slate-600)',
                                backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all var(--transition-fast)',
                            })}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--slate-100)' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--danger)',
                        fontWeight: 500,
                        transition: 'background-color var(--transition-fast)',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <LogOut size={20} />
                        {t('logout')}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
