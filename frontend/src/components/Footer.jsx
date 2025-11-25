import React from 'react';
import { Heart, Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { theme } = useTheme();
    const { t, getLogo } = useLanguage();

    return (
        <footer
            style={{
                background: theme === 'light'
                    ? 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)'
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(29, 42, 65, 0.92) 50%, rgba(6, 63, 78, 0.66) 100%)',
                borderTop: theme === 'light'
                    ? '1px solid #e2e8f0'
                    : '1px solid rgba(103, 232, 249, 0.2)',
                color: theme === 'light' ? '#475569' : '#cbd5e1',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            {/* Main Footer Content */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '3rem 2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                }}
            >
                {/* Brand Section */}
                <div>
                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                            src={getLogo()}
                            alt="Swasthya-Mitra"
                            style={{ height: '60px', width: 'auto' }}
                            className="nav-logo"
                            onError={(e) => {
                                e.currentTarget.src = '/assets/logo-en.svg';
                            }}
                        />
                    </div>
                    <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: theme === 'light' ? '#64748b' : '#94a3b8' }}>
                        {t('appDescription') || 'Transforming healthcare delivery with innovative technology and patient-centric solutions.'}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)',
                                color: theme === 'light' ? '#0891b2' : '#67e8f9',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#cbd5e1' : 'rgba(103, 232, 249, 0.2)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)',
                                color: theme === 'light' ? '#0891b2' : '#67e8f9',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#cbd5e1' : 'rgba(103, 232, 249, 0.2)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)',
                                color: theme === 'light' ? '#0891b2' : '#67e8f9',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#cbd5e1' : 'rgba(103, 232, 249, 0.2)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#e2e8f0' : 'rgba(103, 232, 249, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9', fontSize: '0.95rem' }}>
                        {t('Quick Links') || 'Quick Links'}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>
                            <a
                                href="/"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('home') || 'Home'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('about') || 'About Us'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('services') || 'Services'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('contact') || 'Contact'}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9', fontSize: '0.95rem' }}>
                        {t('support') || 'Support'}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('helpCenter') || 'Help Center'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('documentation') || 'Documentation'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('faq') || 'FAQ'}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{
                                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    transition: 'color 0.3s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                                }}
                            >
                                {t('status') || 'Status'}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: theme === 'light' ? '#0f172a' : '#f1f5f9', fontSize: '0.95rem' }}>
                        {t('contactUs') || 'Contact Us'}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <Phone size={18} style={{ color: '#0d9488', marginTop: '0.25rem', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.875rem' }}>+91 (555) 123-4567</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <Mail size={18} style={{ color: '#0d9488', marginTop: '0.25rem', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.875rem' }}>support@swasthydmitra.com</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <MapPin size={18} style={{ color: '#0d9488', marginTop: '0.25rem', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.875rem' }}>{t('location') || 'Mumbai, India'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div
                style={{
                    borderTop: theme === 'light'
                        ? '1px solid #e2e8f0'
                        : '1px solid rgba(103, 232, 249, 0.1)',
                    margin: '2rem 0',
                }}
            ></div>

            {/* Bottom Section */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.875rem',
                    color: theme === 'light' ? '#64748b' : '#94a3b8',
                }}
            >
                <div>
                    © 2024 Swasthya-Mitra. {t('all Rights Reserved') || 'All rights reserved'}. <br />{t('made With ') || 'Made with'} <Heart size={14} style={{ display: 'inline', color: '#ef4444' }} /> {t('for Healthcare') || 'for healthcare'}.
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a
                        href="#"
                        style={{
                            color: theme === 'light' ? '#64748b' : '#94a3b8',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                        }}
                    >
                        {t('privacyPolicy') || 'Privacy Policy'}
                    </a>
                    <a
                        href="#"
                        style={{
                            color: theme === 'light' ? '#64748b' : '#94a3b8',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                        }}
                    >
                        {t('termsOfService') || 'Terms of Service'}
                    </a>
                    <a
                        href="#"
                        style={{
                            color: theme === 'light' ? '#64748b' : '#94a3b8',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#0f172a' : '#67e8f9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = theme === 'light' ? '#64748b' : '#94a3b8';
                        }}
                    >
                        {t('cookiePolicy') || 'Cookie Policy'}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
