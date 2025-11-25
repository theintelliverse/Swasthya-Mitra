import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Home } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

/**
 * Reusable Navbar Component
 * Includes logo, language switcher, theme toggle, and auth buttons
 */
const Navbar = ({ showAuthButtons = true, transparent = false }) => {
    const navigate = useNavigate();
    const themeContext = useTheme();
    const languageContext = useLanguage();

    const theme = themeContext?.theme || 'light';
    const toggleTheme = themeContext?.toggleTheme;
    const language = languageContext?.language || 'en';
    const setLanguage = languageContext?.setLanguage;
    const getLogo = languageContext?.getLogo || (() => '/assets/logo-en.svg');

    return (
        <nav
            className="app-navbar"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: transparent
                    ? 'transparent'
                    : theme === 'light'
                    ? '#ffffff'
                    : 'linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, rgba(26, 35, 50, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: transparent
                    ? 'none'
                    : theme === 'light'
                    ? '1px solid #e2e8f0'
                    : '1px solid rgba(103, 232, 249, 0.25)',
                padding: '0.75rem 1.5rem',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                    src={getLogo()}
                    alt="Swasthya-Mitra"
                    style={{
                        height: '45px',
                        width: 'auto',
                        cursor: 'pointer',
                    }}
                    className="nav-logo"
                    onClick={() => navigate('/')}
                    onError={(e) => {
                        e.currentTarget.src = '/assets/logo-en.svg';
                    }}
                />
            </div>
            
            <div
                className="nav-actions"
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                }}
            >
                {/* Language Dropdown */}
                <select
                    value={language}
                    onChange={(e) => setLanguage && setLanguage(e.target.value)}
                    className="nav-language-select"
                    style={{
                        padding: '0.6rem 2rem 0.6rem 0.75rem',
                        background: theme === 'light' 
                            ? '#ffffff'
                            : 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: theme === 'light' 
                            ? '1.5px solid #cbd5e1' 
                            : '1.5px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '0.625rem',
                        color: theme === 'light' ? '#0f172a' : 'rgba(15, 23, 42, 0.8)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23${theme === 'light' ? '0f172a' : '0f172a'}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.5rem center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: theme === 'light' 
                            ? '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
                            : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = theme === 'light'
                            ? '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)'
                            : '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.borderColor = theme === 'light' ? '#cbd5e1' : '#64748b';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme === 'light' 
                            ? '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
                            : '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.borderColor = theme === 'light' ? '#cbd5e1' : '#475569';
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.outline = 'none';
                        e.currentTarget.style.borderColor = theme === 'light' ? '#0f172a' : '#f1f5f9';
                        e.currentTarget.style.boxShadow = theme === 'light'
                            ? '0 0 0 3px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)'
                            : '0 0 0 3px rgba(241, 245, 249, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.boxShadow = theme === 'light'
                            ? '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
                            : '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.borderColor = theme === 'light' ? '#cbd5e1' : '#475569';
                    }}
                >
                    <option value="en" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇬🇧 English</option>
                    <option value="hi" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 हिंदी</option>
                    <option value="bn" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 বাংলা</option>
                    <option value="mr" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 मराठी</option>
                    <option value="ta" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 தமிழ்</option>
                    <option value="te" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 తెలుగు</option>
                    <option value="gu" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ગુજરાતી</option>
                    <option value="kn" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ಕನ್ನಡ</option>
                    <option value="ml" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 മലയാളം</option>
                    <option value="pa" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ਪੰਜਾਬੀ</option>
                    <option value="or" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ଓଡ଼ିଆ</option>
                    <option value="as" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 অসমীয়া</option>
                    <option value="ur" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0f172a' : '#f1f5f9', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 اردو</option>
                    <option value="sa" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 संस्कृत</option>
                    <option value="mai" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 मैथिली</option>
                    <option value="ks" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 کٲشُر</option>
                    <option value="kok" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 कोंकणी</option>
                    <option value="sd" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 سنڌي</option>
                    <option value="mni" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 মৈতৈলোন্</option>
                    <option value="ne" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇳🇵 नेपाली</option>
                    <option value="doi" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 डोगरी</option>
                    <option value="brx" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 बर'</option>
                    <option value="sat" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ṥạṱṭạṳṣỊ</option>
                    <option value="bho" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 भोजपुरी</option>
                    <option value="raj" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 राजस्थानी</option>
                    <option value="hne" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 छत्तीसगढ़ी</option>
                    <option value="bgc" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 हरियाणवी</option>
                    <option value="mag" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 मगही</option>
                    <option value="tcy" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 ತುಳು</option>
                    <option value="kha" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 Ka Ktien Khasi</option>
                    <option value="grt" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 A·chik</option>
                    <option value="lus" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 Mizo ṭawng</option>
                    <option value="trp" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#0e7490' : '#e0f2fe', padding: '0.5rem', fontWeight: 600 }}>🇮🇳 Kokborok</option>
                </select>

                {/* Theme Toggle */}
                <button
                    onClick={() => toggleTheme && toggleTheme()}
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    className="nav-theme-toggle"
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
                        flexShrink: 0,
                        boxShadow: theme === 'light'
                            ? '0 2px 8px rgba(0, 0, 0, 0.05)'
                            : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                        e.currentTarget.style.boxShadow = theme === 'light'
                            ? '0 4px 12px rgba(8, 145, 178, 0.25)'
                            : '0 0 25px rgba(103, 232, 249, 0.4), 0 4px 12px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.boxShadow = theme === 'light'
                            ? '0 2px 8px rgba(8, 145, 178, 0.15)'
                            : '0 0 20px rgba(103, 232, 249, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3)';
                    }}
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={20} />}
                </button>

                {showAuthButtons && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/login')}
                            className="nav-login-btn"
                            style={{
                                color: theme === 'light' ? '#0891b2' : '#a5f3fc',
                                fontWeight: 600,
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate('/register')}
                            className="nav-register-btn"
                        >
                            Register
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;