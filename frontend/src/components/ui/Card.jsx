import React from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Card component with glassmorphism and dark mode gradient support
 */
const Card = ({ children, className = '', glass = true, hover = false, ...props }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const { theme } = useTheme();

    const baseStyles = {
        borderRadius: '1.5rem',
        padding: '1.5rem',
        transition: 'all 0.3s',
    };

    const glassStyles = glass ? {
        background: theme === 'light' 
            ? 'rgba(255, 255, 255, 0.7)'
            : 'linear-gradient(135deg, rgba(42, 63, 82, 0.6) 0%, rgba(30, 41, 59, 0.7) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: theme === 'light'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(103, 232, 249, 0.15)',
        boxShadow: theme === 'light'
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(103, 232, 249, 0.1)',
    } : {
        background: theme === 'light'
            ? 'white'
            : 'linear-gradient(135deg, rgba(42, 63, 82, 0.5) 0%, rgba(30, 41, 59, 0.6) 100%)',
        border: theme === 'light'
            ? '1px solid #e2e8f0'
            : '1px solid rgba(103, 232, 249, 0.15)',
        boxShadow: theme === 'light'
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    };

    const hoverStyles = hover && isHovered ? {
        transform: 'scale(1.05)',
        boxShadow: theme === 'light'
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            : '0 25px 50px -12px rgba(103, 232, 249, 0.2)',
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
