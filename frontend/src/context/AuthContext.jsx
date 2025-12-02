import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const data = await api.user.getMe();
                    setUser(data.user);
                    setProfiles(data.profiles || []);
                    setClinics(data.clinics || []);
                    setIsAuthenticated(true);

                    // Auto-select profile if only one exists
                    if (data.profiles && data.profiles.length === 1) {
                        setSelectedProfile(data.profiles[0]);
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    // Token might be expired, clear it
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userId');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = useCallback(async (accessToken, refreshToken, userId) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);

        try {
            const data = await api.user.getMe();
            setUser(data.user);
            setProfiles(data.profiles || []);
            setClinics(data.clinics || []);
            setIsAuthenticated(true);

            // Auto-select profile if only one exists
            if (data.profiles && data.profiles.length === 1) {
                setSelectedProfile(data.profiles[0]);
                return { needsProfileSelection: false, profile: data.profiles[0] };
            } else if (data.profiles && data.profiles.length > 1) {
                return { needsProfileSelection: true };
            }

            return { needsProfileSelection: false, profile: null };
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        await api.auth.logout();
        setUser(null);
        setProfiles([]);
        setClinics([]);
        setSelectedProfile(null);
        setIsAuthenticated(false);
    }, []);

    const selectProfile = useCallback((profile) => {
        setSelectedProfile(profile);
    }, []);

    // Get user role from selected profile or clinic assignment
    const getUserRole = useCallback(() => {
        if (selectedProfile) {
            return selectedProfile.patientType || 'patient';
        }

        // Check clinic assignments for role
        if (clinics && clinics.length > 0) {
            const firstClinic = clinics[0];
            return firstClinic.role || 'patient';
        }

        return 'patient';
    }, [selectedProfile, clinics]);

    const value = {
        user,
        profiles,
        clinics,
        selectedProfile,
        loading,
        isAuthenticated,
        login,
        logout,
        selectProfile,
        getUserRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
