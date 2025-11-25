import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, Heart, Shield, Clock, Moon, Sun, Globe, Activity, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';

/**
 * LandingPage Component - Hybrid approach with inline styles as fallback
 */
const LandingPage = () => {
    const navigate = useNavigate();
    const themeContext = useTheme();
    const languageContext = useLanguage();

    const theme = themeContext?.theme || 'light';
    const toggleTheme = themeContext?.toggleTheme;
    const language = languageContext?.language || 'en';
    const setLanguage = languageContext?.setLanguage;
    const t = languageContext?.t || ((key) => key);
    const getLogo = languageContext?.getLogo || (() => '/assets/logo-en.svg');

    return (
        <>
            {/* Navbar */}
            <nav
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: theme === 'light' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(71,85,105,0.5)',
                    padding: '1.5rem 2rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src={getLogo()}
                        alt={t('appName')}
                        style={{ height: '40px', width: 'auto' }}
                        onError={(e) => {
                            e.currentTarget.src = '/assets/logo-en.svg';
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Language Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage && setLanguage(e.target.value)}
                            style={{
                                padding: '0.5rem 2rem 0.5rem 0.75rem',
                                background: theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(51, 65, 85, 0.2)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: theme === 'light' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(71,85,105,0.3)',
                                borderRadius: '0.5rem',
                                color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${theme === 'light' ? '4F46E5' : 'C7D2FE'}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                transition: 'all 0.3s',
                            }}
                        >
                            <option value="en">🇬🇧 English</option>
                            <option value="hi">🇮🇳 हिंदी</option>
                            <option value="bn">🇮🇳 বাংলা</option>
                            <option value="mr">🇮🇳 मराठी</option>
                            <option value="ta">🇮🇳 தமிழ்</option>
                            <option value="te">🇮🇳 తెలుగు</option>
                            <option value="gu">🇮🇳 ગુજરાતી</option>
                            <option value="kn">🇮🇳 ಕನ್ನಡ</option>
                            <option value="ml">🇮🇳 മലയാളം</option>
                            <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
                        </select>
                    </div>
                    {/* Theme Toggle */}
                    <button
                        onClick={() => toggleTheme && toggleTheme()}
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: theme === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(51,65,85,0.2)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: theme === 'light' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(71,85,105,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'rotate(180deg) scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                        }}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Button variant="ghost" onClick={() => navigate('/login')}>{t('login')}</Button>
                    <Button onClick={() => navigate('/register')}>{t('getStarted')}</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                style={{
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    background: theme === 'light'
                        ? 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)'
                        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                }}
            >
                <h1
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        maxWidth: '900px',
                        margin: '0 auto 1.5rem',
                        lineHeight: 1.1,
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                    }}
                >
                    {t('heroTitle')} <span style={{ color: '#0d9488' }}>{t('heroTitleHighlight')}</span>{t('heroTitleEnd')}
                </h1>
                <p
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: theme === 'light' ? '#475569' : '#cbd5e1',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        padding: '0 1rem',
                    }}
                >
                    {t('heroSubtitle')}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', padding: '0 1rem' }}>
                    <Button size="lg" onClick={() => navigate('/register')}> {t('bookAppointment')} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} /> </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/login')}> {t('login')} </Button>
                </div>
            </section>

            {/* Features Section */}
            <section
                style={{
                    padding: '6rem 2rem',
                    background: theme === 'light' ? '#ffffff' : '#0f172a',
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: '4rem',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                    }}
                >
                    Features Built for You
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    <FeatureCard icon={Clock} title={t('smartQueue')} desc={t('smartQueueDesc')} theme={theme} />
                    <FeatureCard icon={Activity} title={t('aiWaitTime')} desc={t('aiWaitDesc')} theme={theme} />
                    <FeatureCard icon={Calendar} title={t('easyBooking')} desc={t('easyBookingDesc')} theme={theme} />
                    <FeatureCard icon={Shield} title={t('secureRecords')} desc={t('secureRecordsDesc')} theme={theme} />
                </div>
            </section>
        </>
    );
};

/**
 * FeatureCard Component with Glassmorphism
 */
const FeatureCard = ({ icon: Icon, title, desc, theme }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <div
            style={{
                background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(51,65,85,0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'light' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(71,85,105,0.5)',
                borderRadius: '1.5rem',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    borderRadius: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 10px 15px -3px rgba(20,184,166,0.3)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s',
                }}
            >
                <Icon size={32} style={{ color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{title}</h3>
            <p style={{ color: theme === 'light' ? '#475569' : '#cbd5e1' }}>{desc}</p>
        </div>
    );
};

export default LandingPage;
