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
        ? 'rgba(255, 255, 255, 0.95)'
        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      color: theme === 'light' ? '#0f172a' : '#f1f5f9',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Role-based sidebar navigation */}
      <Sidebar role={role} />

      {/* Top navigation bar with theme/language toggles */}
      <Navbar />

      {/* Main content area - responsive margins controlled by CSS */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
