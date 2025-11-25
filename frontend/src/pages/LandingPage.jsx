import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, Heart, Shield, Clock, Moon, Sun, Globe, Activity, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';

/**
 * LandingPage Component
 * 
 * Public-facing homepage for Swasthya-Mitra application.
 * Features:
 * - Hero section with call-to-action buttons
 * - Feature showcase grid
 * - Sticky navigation bar
 * 
 * @returns {JSX.Element} Landing page with navigation and features
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
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
            {/* Navbar */}
            <nav style={{
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                borderBottom: '1px solid var(--slate-200)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary-600)' }}>
                    <img 
                        src={getLogo()} 
                        alt={t('appName')} 
                        style={{ height: '40px', width: 'auto' }}
                        onError={(e) => {
                            // Fallback to English logo if language-specific logo fails
                            e.target.src = '/assets/logo-en.svg';
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Language Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 2rem 0.5rem 0.75rem',
                                backgroundColor: 'var(--primary-100)',
                                border: '1px solid var(--primary-300)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--primary-700)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234F46E5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.5rem center'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary-200)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary-100)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <option value="en">🇬🇧 English</option>
                            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                            <option value="bn">🇮🇳 বাংলা (Bengali)</option>
                            <option value="mr">🇮🇳 मराठी (Marathi)</option>
                            <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                            <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                            <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
                            <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
                            <option value="ml">🇮🇳 മലയാളം (Malayalam)</option>
                            <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
                            <option value="or">🇮🇳 ଓଡ଼ିଆ (Odia)</option>
                            <option value="as">🇮🇳 অসমীয়া (Assamese)</option>
                            <option value="ur">🇮🇳 اردو (Urdu)</option>
                            <option value="sa">🇮🇳 संस्कृत (Sanskrit)</option>
                            <option value="mai">🇮🇳 मैथिली (Maithili)</option>
                            <option value="ks">🇮🇳 کٲشُر (Kashmiri)</option>
                            <option value="kok">🇮🇳 कोंकणी (Konkani)</option>
                            <option value="sd">🇮🇳 سنڌي (Sindhi)</option>
                            <option value="mni">🇮🇳 মৈতৈলোন্ (Manipuri)</option>
                            <option value="ne">🇮🇳 नेपाली (Nepali)</option>
                            <option value="doi">🇮🇳 डोगरी (Dogri)</option>
                            <option value="brx">🇮🇳 बड़ो (Bodo)</option>
                            <option value="sat">🇮🇳 ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
                            <option value="bho">🇮🇳 भोजपुरी (Bhojpuri)</option>
                            <option value="raj">🇮🇳 राजस्थानी (Rajasthani)</option>
                            <option value="hne">🇮🇳 छत्तीसगढ़ी (Chhattisgarhi)</option>
                            <option value="bgc">🇮🇳 हरियाणवी (Haryanvi)</option>
                            <option value="mag">🇮🇳 मगही (Magahi)</option>
                            <option value="tcy">🇮🇳 ತುಳು (Tulu)</option>
                            <option value="kha">🇮🇳 Khasi</option>
                            <option value="grt">🇮🇳 Garo</option>
                            <option value="lus">🇮🇳 Mizo</option>
                            <option value="trp">🇮🇳 Kokborok</option>
                        </select>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--secondary-100)',
                            border: '1px solid var(--secondary-300)',
                            borderRadius: '50%',
                            color: 'var(--secondary-700)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--secondary-200)';
                            e.currentTarget.style.transform = 'rotate(180deg) scale(1.1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--secondary-100)';
                            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Button variant="ghost" onClick={() => navigate('/login')}>{t('login')}</Button>
                    <Button onClick={() => navigate('/register')}>{t('getStarted')}</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                padding: '6rem 2rem',
                textAlign: 'center',
                background: theme === 'light'
                    ? 'linear-gradient(180deg, var(--primary-50) 0%, white 100%)'
                    : 'linear-gradient(180deg, var(--slate-800) 0%, var(--slate-900) 100%)'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    maxWidth: '800px',
                    margin: '0 auto 1.5rem',
                    lineHeight: 1.1,
                    color: theme === 'light' ? 'var(--slate-900)' : 'white'
                }}>
                    {t('heroTitle')} <span style={{ color: 'var(--primary-600)' }}>{t('heroTitleHighlight')}</span>{t('heroTitleEnd')}
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: theme === 'light' ? 'var(--slate-600)' : 'var(--slate-300)',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem'
                }}>
                    {t('heroSubtitle')}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button size="lg" onClick={() => navigate('/register')}>
                        {t('bookAppointment')} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                        {t('login')}
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section style={{
                padding: '6rem 2rem',
                backgroundColor: theme === 'light' ? 'white' : 'var(--slate-900)'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginBottom: '3rem',
                    color: theme === 'light' ? 'var(--slate-900)' : 'white'
                }}>
                    Features Built for You
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <FeatureCard
                        icon={Clock}
                        title={t('smartQueue')}
                        desc={t('smartQueueDesc')}
                    />
                    <FeatureCard
                        icon={Activity}
                        title={t('aiWaitTime')}
                        desc={t('aiWaitDesc')}
                    />
                    <FeatureCard
                        icon={Calendar}
                        title={t('easyBooking')}
                        desc={t('easyBookingDesc')}
                    />
                    <FeatureCard
                        icon={Shield}
                        title={t('secureRecords')}
                        desc={t('secureRecordsDesc')}
                    />
                </div>
            </section>
        </div>
    );
};

/**
 * FeatureCard Component
 * 
 * Displays a single feature with icon, title, and description.
 * Used in the features grid section of the landing page.
 * 
 * @param {Object} props
 * @param {React.Component} props.icon - Lucide icon component
 * @param {string} props.title - Feature title
 * @param {string} props.desc - Feature description
 * @returns {JSX.Element} Styled feature card
 */
const FeatureCard = ({ icon: Icon, title, desc }) => (
    <Card style={{ padding: '2rem', textAlign: 'center' }}>
        {/* Circular icon container */}
        <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-600)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--slate-600)' }}>{desc}</p>
    </Card>
);

export default LandingPage;
