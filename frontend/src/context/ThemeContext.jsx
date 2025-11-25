import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

/**
 * Manages light/dark preference and syncs it with localStorage + <html> class.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Initialize theme from localStorage on mount
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Apply theme to document on mount and whenever it changes
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        // Flip theme and immediately persist + apply to document root
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
