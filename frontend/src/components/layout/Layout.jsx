import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useTheme } from '../../hooks/useTheme';

/**
 * Layout Component
 * Main application layout wrapper that includes Sidebar and Navbar
 * @param {ReactNode} children - Page content to render
 * @param {string} role - User role (doctor, patient, staff, admin) for role-based navigation
 */
const Layout = ({ children, role }) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme === 'light' 
        ? 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)'
        : 'linear-gradient(180deg, #1a2332 0%, #0f172a 50%, #081529 100%)',
      color: theme === 'light' ? 'var(--slate-900)' : 'var(--slate-50)'
    }}>
      {/* Role-based sidebar navigation */}
      <Sidebar role={role} />

      {/* Top navigation bar with theme/language toggles */}
      <Navbar />

      {/* Main content area - responsive margins controlled by CSS */}
      <main style={{
        marginLeft: '260px', // Default for desktop, overridden by media queries for mobile
        padding: '2rem',
        minHeight: 'calc(100vh - 70px)',
        transition: 'margin-left var(--transition-normal)'
      }} className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
