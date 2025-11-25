import React from 'react';
import { Bell, Search, User, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, getLogo } = useLanguage();

    return (
        <header style={{
            height: '70px',
            background: theme === 'light' 
                ? '#ffffff' 
                : 'linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, rgba(26, 35, 50, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: theme === 'light' 
                ? '1px solid #e2e8f0' 
                : '1px solid rgba(103, 232, 249, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            marginLeft: '260px',
            width: 'calc(100% - 260px)',
            transition: 'all var(--transition-normal)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                    src={getLogo()}
                    alt="Swasthya-Mitra"
                    className="nav-logo"
                    style={{ 
                        height: '45px', 
                        width: 'auto'
                    }}
                    onError={(e) => {
                        e.currentTarget.src = '/assets/logo-en.svg';
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ 
                        position: 'absolute', 
                        left: '0.75rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: theme === 'light' ? '#94a3b8' : 'rgba(15, 23, 42, 0.6)' 
                    }} />
                    <input
                        type="text"
                        placeholder={t('search')}
                        style={{
                            padding: '0.5rem 1rem 0.5rem 2.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(15, 23, 42, 0.2)',
                            backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.3)',
                            fontSize: '0.875rem',
                            width: '200px',
                            outline: 'none',
                            color: theme === 'light' ? '#0f172a' : 'rgba(189, 193, 201, 0.8)',
                        }}
                    />
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher variant="dropdown" />

                {/* Theme toggle */}
                <button 
                    onClick={toggleTheme} 
                    style={{ 
                        width: '40px',
                        height: '40px',
                        borderRadius: '0.625rem',
                        background: theme === 'light' 
                            ? '#f1f5f9'
                            : 'rgba(255, 255, 255, 0.3)',
                        border: theme === 'light' ? '1.5px solid #cbd5e1' : '1.5px solid rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: theme === 'light' ? '#0f172a' : 'rgba(15, 23, 42, 0.8)',
                        boxShadow: theme === 'light'
                            ? '0 2px 8px rgba(0, 0, 0, 0.05)'
                            : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={20} />}
                </button>

                {/* Notifications */}
                <button style={{ 
                    position: 'relative', 
                    color: theme === 'light' ? 'var(--slate-600)' : 'var(--slate-300)', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer' 
                }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--danger)',
                        borderRadius: '50%'
                    }} />
                </button>

                {/* User info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: 600, 
                            color: theme === 'light' ? 'var(--slate-900)' : 'var(--slate-100)' 
                        }}>Dr. Sharma</p>
                        <p style={{ 
                            fontSize: '0.75rem', 
                            color: theme === 'light' ? 'var(--slate-600)' : 'var(--slate-400)' 
                        }}>Cardiologist</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: theme === 'light' 
                            ? 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)'
                            : 'linear-gradient(135deg, rgba(103, 232, 249, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)',
                        color: theme === 'light' ? '#0891b2' : '#67e8f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: theme === 'light' ? 'none' : '1px solid rgba(103, 232, 249, 0.3)'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
