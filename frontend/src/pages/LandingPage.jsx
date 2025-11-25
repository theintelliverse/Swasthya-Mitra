import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, Heart, Shield, Clock, Moon, Sun, Globe, Activity, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';

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
                    gap: '1rem',
                    background: theme === 'light' 
                        ? 'rgba(255, 255, 255, 0.8)' 
                        : 'linear-gradient(90deg, rgba(8, 145, 178, 0.05) 0%, rgba(26, 35, 50, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: theme === 'light' 
                        ? '1px solid rgba(255,255,255,0.2)' 
                        : '1px solid rgba(103, 232, 249, 0.2)',
                    padding: '1rem 2rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src={getLogo()}
                        alt={t('appName')}
                        style={{ 
                            height: '50px', 
                            width: 'auto',
                        }}
                        className="nav-logo"
                        onError={(e) => {
                            e.currentTarget.src = '/assets/logo-en.svg';
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'nowrap' }}>
                    {/* Language Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage && setLanguage(e.target.value)}
                            className="nav-language-select"
                            style={{
                                padding: '0.5rem 0.75rem',
                                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(51, 65, 85, 0.95)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: theme === 'light' ? '1px solid rgba(203, 213, 225, 0.6)' : '1px solid rgba(100, 116, 139, 0.6)',
                                borderRadius: '0.5rem',
                                color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <option value="en" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇬🇧 English</option>
                            <option value="hi" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 हिंदी (Hindi)</option>
                            <option value="bn" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 বাংলা (Bengali)</option>
                            <option value="mr" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 मराठी (Marathi)</option>
                            <option value="ta" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 தமிழ் (Tamil)</option>
                            <option value="te" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 తెలుగు (Telugu)</option>
                            <option value="gu" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ગુજરાતી (Gujarati)</option>
                            <option value="kn" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ಕನ್ನಡ (Kannada)</option>
                            <option value="ml" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 മലയാളം (Malayalam)</option>
                            <option value="pa" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
                            <option value="or" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ଓଡ଼ିଆ (Odia)</option>
                            <option value="as" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 অসমীয়া (Assamese)</option>
                            <option value="ur" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 اردو (Urdu)</option>
                            <option value="sa" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 संस्कृत (Sanskrit)</option>
                            <option value="mai" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 मैथिली (Maithili)</option>
                            <option value="ks" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 کٲشُر (Kashmiri)</option>
                            <option value="kok" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 कोंकणी (Konkani)</option>
                            <option value="sd" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 سنڌي (Sindhi)</option>
                            <option value="mni" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 মৈতৈলোন্ (Manipuri)</option>
                            <option value="ne" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇳🇵 नेपाली (Nepali)</option>
                            <option value="doi" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 डोगरी (Dogri)</option>
                            <option value="brx" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 बर' (Bodo)</option>
                            <option value="sat" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
                            <option value="bho" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 भोजपुरी (Bhojpuri)</option>
                            <option value="raj" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 राजस्थानी (Rajasthani)</option>
                            <option value="hne" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 छत्तीसगढ़ी (Chhattisgarhi)</option>
                            <option value="bgc" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 हरियाणवी (Haryanvi)</option>
                            <option value="mag" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 मगही (Magahi)</option>
                            <option value="tcy" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 ತುಳು (Tulu)</option>
                            <option value="kha" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 Ka Ktien Khasi (Khasi)</option>
                            <option value="grt" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 A·chik (Garo)</option>
                            <option value="lus" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 Mizo ṭawng (Mizo)</option>
                            <option value="trp" style={{ background: theme === 'light' ? '#ffffff' : '#1e293b', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>🇮🇳 Kokborok (Kokborok)</option>
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
                            background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(51,65,85,0.9)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: theme === 'light' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(71,85,105,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                            flexShrink: 0,
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
                    <Button variant="ghost" onClick={() => navigate('/login')} className="nav-login-btn">{t('login')}</Button>
                    <Button onClick={() => navigate('/register')} className="nav-getstarted-btn">{t('getStarted')}</Button>
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

            {/* Footer */}
            <Footer />
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
