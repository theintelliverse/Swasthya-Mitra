import React from 'react';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, getLogo } = useLanguage();
    const [isCompact, setIsCompact] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768;
        }
        return false;
    });

    React.useEffect(() => {
        const updateCompact = () => {
            if (typeof window !== 'undefined') {
                setIsCompact(window.innerWidth <= 768);
            }
        };

        window.addEventListener('resize', updateCompact);
        return () => window.removeEventListener('resize', updateCompact);
    }, []);

    const controlGap = isCompact ? '0.5rem' : 'clamp(0.75rem, 1.5vw, 1.25rem)';
    const iconButtonSize = isCompact ? 'clamp(34px, 9vw, 40px)' : 'clamp(36px, 8vw, 44px)';

    return (
        <header 
            className="dashboard-navbar"
            style={{
            height: 'clamp(60px, 10vw, 70px)',
            background: theme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, rgba(26, 35, 50, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)',
            color: theme === 'light' ? '#0f172a' : '#f1f5f9',
            transition: 'background-color 0.3s ease',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: theme === 'light' 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(103, 232, 249, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 2vw, 2rem)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            overflow: 'hidden',
            boxSizing: 'border-box',
            maxWidth: '100%',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1vw, 1rem)', minWidth: 'auto', flexShrink: 0 }}>
                <img
                    src={getLogo()}
                    alt="Swasthya-Mitra"
                    className="nav-logo"
                    style={{ 
                        height: 'clamp(35px, 5vw, 45px)', 
                        width: 'auto'
                    }}
                    onError={(e) => {
                        e.currentTarget.src = '/assets/logo-en.svg';
                    }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: controlGap,
                    minWidth: 0,
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexWrap: isCompact ? 'wrap' : 'nowrap',
                    rowGap: isCompact ? '0.5rem' : 0,
                    maxWidth: '100%',
                }}
            >
                {!isCompact && (
                    <div
                        className="nav-search-container"
                        style={{
                            position: 'relative',
                            minWidth: 0,
                            flex: '1 1 clamp(180px, 26vw, 260px)',
                            maxWidth: 'min(260px, 100%)'
                        }}
                    >
                        <Search size={20} style={{ 
                            position: 'absolute', 
                            left: '0.75rem', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            color: theme === 'light' ? '#64748b' : '#cbd5e1' 
                        }} />
                        <input
                            type="text"
                            placeholder={t('search')}
                            style={{
                                padding: '0.5rem 1rem 0.5rem 2.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: theme === 'light' ? '1px solid rgba(203, 213, 225, 0.6)' : '1px solid rgba(100, 116, 139, 0.6)',
                                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(51, 65, 85, 0.95)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                fontSize: '0.875rem',
                                width: '100%',
                                outline: 'none',
                                color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                )}

                {/* Language Switcher */}
                <LanguageSwitcher
                    variant={isCompact ? 'button' : 'dropdown'}
                    showLabel={!isCompact}
                    containerStyle={{
                        flex: isCompact ? '0 0 auto' : '0 1 clamp(130px, 22vw, 180px)',
                        minWidth: 0,
                    }}
                    selectStyle={!isCompact ? {
                        minWidth: 'auto',
                        width: '100%',
                        maxWidth: '190px',
                        padding: '0.5rem 2rem 0.5rem 0.75rem',
                        fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                        boxSizing: 'border-box',
                    } : undefined}
                    buttonStyle={isCompact ? {
                        width: iconButtonSize,
                        height: iconButtonSize,
                        borderRadius: '999px',
                        padding: 0,
                        justifyContent: 'center',
                        background: theme === 'light' ? '#f1f5f9' : 'rgba(255, 255, 255, 0.2)',
                        border: theme === 'light' ? '1.5px solid #cbd5e1' : '1.5px solid rgba(255, 255, 255, 0.35)',
                        color: theme === 'light' ? '#0f172a' : '#e0f2fe',
                    } : undefined}
                />

                {/* Theme toggle */}
                <button 
                    onClick={toggleTheme} 
                    style={{ 
                        width: iconButtonSize,
                        height: iconButtonSize,
                        borderRadius: '0.625rem',
                        flexShrink: 0,
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
                    cursor: 'pointer',
                    width: iconButtonSize,
                    height: iconButtonSize,
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                <div className="nav-user-info" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isCompact ? '0.5rem' : 'clamp(0.5rem, 1vw, 0.75rem)',
                    minWidth: 0,
                    flex: '0 0 auto',
                }}>
                    {!isCompact && (
                        <div className="nav-user-text" style={{
                            textAlign: 'right',
                            minWidth: 0,
                            whiteSpace: 'nowrap',
                            maxWidth: 'clamp(120px, 18vw, 180px)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            <p style={{ 
                                fontSize: '0.875rem', 
                                color: theme === 'light' ? 'var(--slate-900)' : 'var(--slate-100)' 
                            }}>Doctor</p>
                            <p style={{ 
                                fontSize: '0.75rem', 
                                color: theme === 'light' ? 'var(--slate-600)' : 'var(--slate-400)' 
                            }}>Cardiologist</p>
                        </div>
                    )}
                    <div style={{
                        width: iconButtonSize,
                        height: iconButtonSize,
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
