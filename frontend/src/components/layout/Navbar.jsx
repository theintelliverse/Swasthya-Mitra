import React from 'react';
import { Bell, Search, User, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage(); // t may be used for translations

    return (
        <header style={{
            height: '70px',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            marginLeft: '260px', // Offset for sidebar
            width: 'calc(100% - 260px)',
            transition: 'all var(--transition-normal)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--slate-600)' }}>
                {/* Breadcrumbs or Page Title could go here */}
                <span style={{ fontWeight: 500 }}>{t('dashboard')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                    <input
                        type="text"
                        placeholder={t('search')}
                        style={{
                            padding: '0.5rem 1rem 0.5rem 2.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--slate-200)',
                            backgroundColor: 'var(--slate-50)',
                            fontSize: '0.875rem',
                            width: '200px',
                            outline: 'none',
                            color: 'var(--slate-900)'
                        }}
                    />
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher variant="dropdown" />

                {/* Theme toggle */}
                <button onClick={toggleTheme} style={{ color: 'var(--slate-600)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Notifications */}
                <button style={{ position: 'relative', color: 'var(--slate-600)', background: 'none', border: 'none', cursor: 'pointer' }}>
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
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-900)' }}>Dr. Sharma</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Cardiologist</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-100)',
                        color: 'var(--primary-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
