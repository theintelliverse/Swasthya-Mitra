import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * Layout Component
 * Main application layout wrapper that includes Sidebar and Navbar
 * @param {ReactNode} children - Page content to render
 * @param {string} role - User role (doctor, patient, staff, admin) for role-based navigation
 */
const Layout = ({ children, role }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
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
