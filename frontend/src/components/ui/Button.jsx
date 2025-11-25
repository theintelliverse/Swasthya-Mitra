import React from 'react';

/**
 * Reusable button component that centralizes sizing, variants,
 * and interactive states so every CTA looks and behaves consistently.
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  disabled = false,
  ...props 
}) => {
  // Base presentation shared by every variant/size combination
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    fontWeight: '500',
    transition: 'all var(--transition-normal)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.7 : 1,
    position: 'relative',
    overflow: 'hidden',
  };

  // Theme-aware color palettes keyed by variant name
  const variants = {
    primary: {
      backgroundColor: 'var(--primary-600)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      backgroundColor: 'var(--secondary-600)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--slate-300)',
      color: 'var(--slate-700)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--slate-700)',
    },
    danger: {
      backgroundColor: 'var(--danger)',
      color: 'white',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'var(--slate-900)',
    }
  };

  // Spacing presets so buttons remain proportionate across layouts
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    icon: { padding: '0.5rem', width: '2.5rem', height: '2.5rem' }
  };

  // Hover effects (inline for simplicity, could be CSS classes)
  const handleMouseEnter = (e) => {
    if (disabled || isLoading) return;
    if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--primary-700)';
    if (variant === 'secondary') e.currentTarget.style.backgroundColor = 'var(--secondary-700)';
    if (variant === 'outline') e.currentTarget.style.backgroundColor = 'var(--slate-50)';
    if (variant === 'ghost') e.currentTarget.style.backgroundColor = 'var(--slate-100)';
  };

  const handleMouseLeave = (e) => {
    if (disabled || isLoading) return;
    e.currentTarget.style.backgroundColor = variants[variant].backgroundColor;
  };

  return (
    <button
      style={{ ...baseStyles, ...variants[variant], ...sizes[size] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <span style={{ marginRight: '0.5rem' }}>...</span> // Temporary loading glyph until spinner lands
      ) : null}
      {children}
    </button>
  );
};

export default Button;
