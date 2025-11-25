import React from 'react';

const Input = ({
    label,
    type = 'text',
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem',
        width: '100%',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--slate-700)',
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        paddingLeft: Icon ? '2.5rem' : '1rem',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${error ? 'var(--danger)' : 'var(--slate-300)'}`,
        backgroundColor: 'white',
        fontSize: '1rem',
        color: 'var(--slate-900)',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        outline: 'none',
    };

    const iconStyle = {
        position: 'absolute',
        left: '0.75rem',
        color: 'var(--slate-400)',
        pointerEvents: 'none',
    };

    const errorStyle = {
        fontSize: '0.75rem',
        color: 'var(--danger)',
        marginTop: '0.25rem',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--primary-500)';
        e.target.style.boxShadow = '0 0 0 3px var(--primary-100)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = error ? 'var(--danger)' : 'var(--slate-300)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={containerStyle} className={className}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={inputWrapperStyle}>
                {Icon && <Icon size={18} style={iconStyle} />}
                <input
                    type={type}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </div>
            {error && <span style={errorStyle}>{error}</span>}
        </div>
    );
};

export default Input;
