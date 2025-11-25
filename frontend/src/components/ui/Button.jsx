import React from 'react';

/**
 * Button component with inline styles (Tailwind-ready)
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
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.3s',
    borderRadius: '0.5rem',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.5 : 1,
    border: 'none',
    fontFamily: 'inherit'
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#0d9488',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    secondary: {
      backgroundColor: '#4f46e5',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '2px solid #cbd5e1',
      color: '#334155',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#334155',
    },
    danger: {
      backgroundColor: '#dc2626',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  };

  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    icon: { padding: '0.5rem', width: '2.5rem', height: '2.5rem' },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  const handleMouseEnter = (e) => {
    if (disabled || isLoading) return;
    if (variant === 'primary') e.currentTarget.style.backgroundColor = '#0a6b62';
    if (variant === 'secondary') e.currentTarget.style.backgroundColor = '#4338ca';
    if (variant === 'outline') e.currentTarget.style.backgroundColor = '#f8fafc';
    if (variant === 'ghost') e.currentTarget.style.backgroundColor = '#f1f5f9';
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e) => {
    if (disabled || isLoading) return;
    e.currentTarget.style.backgroundColor = variantStyles[variant].backgroundColor || 'transparent';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none';
  };

  return (
    <button
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading && (
        <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem', height: '1rem', width: '1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
