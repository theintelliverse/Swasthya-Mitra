import React from 'react';

const Card = ({ children, className = '', glass = false, ...props }) => {
    const style = {
        backgroundColor: glass ? 'var(--glass-bg)' : 'white',
        backdropFilter: glass ? 'var(--backdrop-blur)' : 'none',
        border: glass ? '1px solid var(--glass-border)' : '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: glass ? 'var(--glass-shadow)' : 'var(--shadow-sm)',
        padding: '1.5rem',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
        ...props.style
    };

    return (
        <div className={`card ${className}`} style={style} {...props}>
            {children}
        </div>
    );
};

export default Card;
