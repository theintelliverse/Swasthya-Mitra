import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in (e.g., via a profile endpoint)
    // For now, we'll assume we check local storage or a verify endpoint if available
    // The backend uses cookies, so we might need a /me endpoint or similar to persist session

    // NOTE: Based on backend routes, there isn't a direct /me endpoint in the root of auth routes,
    // but usually /users/profile or similar acts as one. 
    // I will implement a checkUser function that tries to get the user profile.

    const checkUser = async () => {
        try {
            const response = await api.get('/users/me');
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const sendOtp = async (phone) => {
        try {
            const response = await api.post('/auth/send-otp', { phone });
            toast.success(response.data.message);
            return response.data; // e.g. otpId
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send OTP');
            return null;
        }
    };

    const verifyOtpLogin = async (phone, otpCode, otpId) => {
        try {
            const response = await api.post('/auth/verify-otp', { phone, otpCode, otpId });
            // Backend returns accessToken, refreshToken, userId
            // Check if we need to set cookie manually or if backend sets it.
            // app.js has cookieParser, but verifyOtp sends token in body.
            // If backend sends token in body, we might need to store it or interceptor handles it? 
            // app.js uses cors credentials=true.
            // Let's assume we might need to store token in localStorage if it's not a cookie.
            // Looking at `verifyOtp`, it sends json with accessToken.
            // Usually axios interceptor needs to attach it.

            // SAVE TOKEN
            localStorage.setItem('accessToken', response.data.accessToken);

            setUser({ _id: response.data.userId }); // Set minimal user, checkUser will fetch full profile
            await checkUser(); // Fetch full profile
            toast.success('Logged in successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, sendOtp, verifyOtpLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
