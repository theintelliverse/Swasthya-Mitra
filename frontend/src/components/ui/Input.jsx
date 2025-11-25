import React from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Input component with dark mode gradient support
 */
const Input = ({
    label,
    type = 'text',
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    const { theme } = useTheme();

    const inputClasses = `
        w-full px-4 py-3 rounded-lg
        border ${error ? 'border-red-500' : theme === 'light' ? 'border-slate-300' : 'border-slate-600'}
        ${theme === 'light' ? 'bg-white' : 'bg-slate-800'}
        ${theme === 'light' ? 'text-slate-900' : 'text-white'}
        ${theme === 'light' ? 'placeholder:text-slate-400' : 'placeholder:text-slate-500'}
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
        transition-all duration-200
        ${Icon ? 'pl-10' : ''}
    `;

    return (
        <div className={`flex flex-col gap-2 mb-4 w-full ${className}`}>
            {label && (
                <label className={`text-sm font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {Icon && (
                    <Icon
                        size={18}
                        className={`absolute left-3 pointer-events-none ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                    />
                )}
                <input
                    type={type}
                    className={inputClasses}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-xs text-red-500 mt-1">{error}</span>
            )}
        </div>
    );
};

export default Input;
