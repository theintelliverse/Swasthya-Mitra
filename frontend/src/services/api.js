// API Service for Swasthya-Mitra
// Connects frontend to backend API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('accessToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || error.message || 'Request failed');
    }
    return response.json();
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    return handleResponse(response);
};

export const api = {
    // Authentication endpoints
    auth: {
        sendOtp: async (phone) => {
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });
            return handleResponse(response);
        },

        verifyOtp: async (phone, otpCode, otpId) => {
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otpCode, otpId }),
            });
            return handleResponse(response);
        },

        login: async (phoneOrEmail, password) => {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneOrEmail, password }),
            });
            return handleResponse(response);
        },

        register: async (data) => {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },

        logout: async () => {
            try {
                await authFetch('/auth/logout', { method: 'POST' });
            } finally {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
            }
        },
    },

    // User endpoints
    user: {
        getMe: async () => {
            return authFetch('/me');
        },
    },

    // Clinic endpoints
    clinic: {
        create: async (name, address) => {
            return authFetch('/clinics', {
                method: 'POST',
                body: JSON.stringify({ name, address }),
            });
        },

        addUser: async (clinicId, userId, role, permissions = []) => {
            return authFetch('/clinic-user', {
                method: 'POST',
                body: JSON.stringify({ clinicId, userId, role, permissions }),
            });
        },
    },

    // Queue endpoints
    queue: {
        add: async (clinicId, doctorUserId, patientProfileId, appointmentId = null) => {
            return authFetch('/queue/add', {
                method: 'POST',
                body: JSON.stringify({ clinicId, doctorUserId, patientProfileId, appointmentId }),
            });
        },

        getStatus: async (clinicId, doctorId) => {
            return authFetch(`/queue/status?clinicId=${clinicId}&doctorId=${doctorId}`);
        },

        next: async (clinicId, doctorUserId) => {
            return authFetch('/queue/next', {
                method: 'POST',
                body: JSON.stringify({ clinicId, doctorUserId }),
            });
        },

        skip: async (queueId) => {
            return authFetch('/queue/skip', {
                method: 'POST',
                body: JSON.stringify({ queueId }),
            });
        },

        recall: async (queueId) => {
            return authFetch('/queue/recall', {
                method: 'POST',
                body: JSON.stringify({ queueId }),
            });
        },

        complete: async (queueId) => {
            return authFetch('/queue/complete', {
                method: 'POST',
                body: JSON.stringify({ queueId }),
            });
        },
    },
};

export default api;
