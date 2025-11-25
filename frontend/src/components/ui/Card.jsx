import React from 'react';

/**
 * Card component with glassmorphism (inline styles fallback)
 */
const Card = ({ children, className = '', glass = true, hover = false, ...props }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const baseStyles = {
        borderRadius: '1.5rem',
        padding: '1.5rem',
        transition: 'all 0.3s',
    };

    const glassStyles = glass ? {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    } : {
        background: 'white',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    const hoverStyles = hover && isHovered ? {
        transform: 'scale(1.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    } : {};

    const combinedStyles = {
        ...baseStyles,
        ...glassStyles,
        ...hoverStyles,
    };

    return (
        <div
            style={combinedStyles}
            className={className}
            onMouseEnter={() => hover && setIsHovered(true)}
            onMouseLeave={() => hover && setIsHovered(false)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
