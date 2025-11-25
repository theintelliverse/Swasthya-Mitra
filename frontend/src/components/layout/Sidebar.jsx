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
                className="mobile-menu-btn"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    background: theme === 'light'
                        ? '#ffffff'
                        : 'linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, rgba(26, 35, 50, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRight: theme === 'light'
                        ? '1px solid #e2e8f0'
                        : '1px solid rgba(103, 232, 249, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
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
                            onClick={() => setIsOpen(false)}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                color: isActive 
                                    ? (theme === 'light' ? '#0891b2' : '#67e8f9')
                                    : (theme === 'light' ? '#64748b' : '#cbd5e1'),
                                backgroundColor: isActive
                                    ? (theme === 'light' ? 'rgba(8, 145, 178, 0.1)' : 'rgba(103, 232, 249, 0.1)')
                                    : 'transparent',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all 0.3s ease',
                                border: isActive ? `1px solid rgba(103, 232, 249, 0.2)` : 'none',
                                cursor: 'pointer'
                            })}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme === 'light' 
                                    ? 'rgba(8, 145, 178, 0.05)' 
                                    : 'rgba(103, 232, 249, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                const isActive = location.pathname === link.path;
                                e.currentTarget.style.backgroundColor = isActive
                                    ? (theme === 'light' ? 'rgba(8, 145, 178, 0.1)' : 'rgba(103, 232, 249, 0.1)')
                                    : 'transparent';
                            }}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(103, 232, 249, 0.1)' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        color: theme === 'light' ? '#ef4444' : '#fca5a5',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme === 'light' ? '#fee2e2' : 'rgba(252, 165, 165, 0.2)'}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = theme === 'light' ? '#fef2f2' : 'rgba(252, 165, 165, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
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
