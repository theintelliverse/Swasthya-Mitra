import React from 'react';

/**
 * Input component with Tailwind CSS styling
 */
const Input = ({
    label,
    type = 'text',
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    const inputClasses = `
        w-full px-4 py-3 rounded-lg
        border ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}
        bg-white dark:bg-slate-800
        text-slate-900 dark:text-white
        placeholder:text-slate-400 dark:placeholder:text-slate-500
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
        transition-all duration-200
        ${Icon ? 'pl-10' : ''}
    `;

    return (
        <div className={`flex flex-col gap-2 mb-4 w-full ${className}`}>
            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {Icon && (
                    <Icon
                        size={18}
                        className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none"
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
