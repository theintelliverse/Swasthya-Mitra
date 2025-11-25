import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { Globe } from 'lucide-react';

/**
 * LanguageSwitcher Component
 * Supports both dropdown and button (cycle) variants.
 * Uses CSS variables for theming to respect light and dark modes.
 */
const LanguageSwitcher = ({
    variant = 'dropdown',
    containerStyle = {},
    selectStyle = {},
    buttonStyle = {},
    showLabel = true,
}) => {
    const { language, setLanguage } = useLanguage();
    const { theme } = useTheme();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
        { code: 'bn', name: 'Bengali', flag: '🇮🇳', native: 'বাংলা' },
        { code: 'mr', name: 'Marathi', flag: '🇮🇳', native: 'मराठी' },
        { code: 'ta', name: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
        { code: 'te', name: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
        { code: 'gu', name: 'Gujarati', flag: '🇮🇳', native: 'ગુજરાતી' },
        { code: 'kn', name: 'Kannada', flag: '🇮🇳', native: 'ಕನ್ನಡ' },
        { code: 'ml', name: 'Malayalam', flag: '🇮🇳', native: 'മലയാളം' },
        { code: 'pa', name: 'Punjabi', flag: '🇮🇳', native: 'ਪੰਜਾਬੀ' },
        { code: 'or', name: 'Odia', flag: '🇮🇳', native: 'ଓଡ଼ିଆ' },
        { code: 'as', name: 'Assamese', flag: '🇮🇳', native: 'অসমীয়া' },
        { code: 'ur', name: 'Urdu', flag: '🇮🇳', native: 'اردو' },
        { code: 'sa', name: 'Sanskrit', flag: '🇮🇳', native: 'संस्कृत' },
        { code: 'mai', name: 'Maithili', flag: '🇮🇳', native: 'मैथिली' },
        { code: 'ks', name: 'Kashmiri', flag: '🇮🇳', native: 'کٲشُر' },
        { code: 'kok', name: 'Konkani', flag: '🇮🇳', native: 'कोंकणी' },
        { code: 'sd', name: 'Sindhi', flag: '🇮🇳', native: 'سنڌي' },
        { code: 'mni', name: 'Manipuri', flag: '🇮🇳', native: 'মৈতৈলোন্' },
        { code: 'ne', name: 'Nepali', flag: '🇳🇵', native: 'नेपाली' },
        { code: 'doi', name: 'Dogri', flag: '🇮🇳', native: 'डोगरी' },
        { code: 'brx', name: 'Bodo', flag: '🇮🇳', native: "बर'" },
        { code: 'sat', name: 'Santali', flag: '🇮🇳', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
        { code: 'bho', name: 'Bhojpuri', flag: '🇮🇳', native: 'भोजपुरी' },
        { code: 'raj', name: 'Rajasthani', flag: '🇮🇳', native: 'राजस्थानी' },
        { code: 'hne', name: 'Chhattisgarhi', flag: '🇮🇳', native: 'छत्तीसगढ़ी' },
        { code: 'bgc', name: 'Haryanvi', flag: '🇮🇳', native: 'हरियाणवी' },
        { code: 'mag', name: 'Magahi', flag: '🇮🇳', native: 'मगही' },
        { code: 'tcy', name: 'Tulu', flag: '🇮🇳', native: 'ತುಳು' },
        { code: 'kha', name: 'Khasi', flag: '🇮🇳', native: 'Ka Ktien Khasi' },
        { code: 'grt', name: 'Garo', flag: '🇮🇳', native: 'A·chik' },
        { code: 'lus', name: 'Mizo', flag: '🇮🇳', native: 'Mizo ṭawng' },
        { code: 'trp', name: 'Kokborok', flag: '🇮🇳', native: 'Kokborok' },
    ];

    if (variant === 'button') {
        return (
            <button
                onClick={() => {
                    const currentIndex = languages.findIndex(l => l.code === language);
                    const nextIndex = (currentIndex + 1) % languages.length;
                    setLanguage(languages[nextIndex].code);
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: showLabel ? '0.5rem' : '0',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--lang-bg)',
                    border: '1px solid var(--lang-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--lang-text)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    ...buttonStyle,
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--lang-bg-hover)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--lang-bg)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <Globe size={16} />
                {showLabel && <span>{language.toUpperCase()}</span>}
            </button>
        );
    }

    // Dropdown variant with improved dark mode support
    return (
        <div style={{ position: 'relative', minWidth: 0, ...containerStyle }}>
            <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 2rem 0.5rem 0.75rem',
                    backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(51, 65, 85, 0.9)',
                    border: theme === 'light' ? '1px solid rgba(203, 213, 225, 0.5)' : '1px solid rgba(100, 116, 139, 0.5)',
                    borderRadius: 'var(--radius-md)',
                    color: theme === 'light' ? '#1e293b' : '#cbd5e1',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${theme === 'light' ? '4F46E5' : '94a3b8'}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    minWidth: 'clamp(120px, 18vw, 180px)',
                    width: '100%',
                    maxWidth: '220px',
                    boxSizing: 'border-box',
                    flexShrink: 1,
                    ...selectStyle,
                }}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(71, 85, 105, 0.9)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(51, 65, 85, 0.9)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {languages.map(lang => (
                    <option 
                        key={lang.code} 
                        value={lang.code}
                        style={{
                            background: theme === 'light' ? '#ffffff' : '#1e293b',
                            color: theme === 'light' ? '#1e293b' : '#f1f5f9'
                        }}
                    >
                        {lang.flag} {lang.native} ({lang.name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
