// API Service for Swasthya-Mitra
// DEBUG ENABLED VERSION (SAFE FOR DEV)

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// -------------------- HELPERS --------------------

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  console.log('[API] Access Token:', token);
  return token;
};

const handleResponse = async (response) => {
  console.log('[API] Response status:', response.status);

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  console.log('[API] Response data:', data);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Request failed');
  }

  return data;
};

const authFetch = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log('[API] AUTH FETCH →', `${API_BASE_URL}${url}`);
  console.log('[API] OPTIONS →', options);

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

// -------------------- API OBJECT --------------------

export const api = {
  // -------- AUTH --------
  auth: {
    sendOtp: async (phone) => {
      const payload = { phone };

      console.log('[AUTH] sendOtp payload:', payload);
      console.log('[AUTH] sendOtp URL:', `${API_BASE_URL}/auth/send-otp`);

      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    },

    verifyOtp: async (phone, otpCode, otpId) => {
      const payload = { phone, otpCode, otpId };

      console.log('[AUTH] verifyOtp payload:', payload);
      console.log('[AUTH] verifyOtp URL:', `${API_BASE_URL}/auth/verify-otp`);

      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    },

    login: async (phoneOrEmail, password) => {
      const payload = { phoneOrEmail, password };

      console.log('[AUTH] login payload:', payload);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      return handleResponse(response);
    },

    register: async (data) => {
      console.log('[AUTH] register payload:', data);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    },
  },
// -------- USER --------
user: {
  getMe: async () => {
    console.log('[USER] getMe → /me');
    return authFetch('/users/me');
  },
},

  // -------- CLINIC --------
  clinic: {
    create: async (name, address = '') => {
      console.log('[CLINIC] create:', { name, address });

      return authFetch('/clinics', {
        method: 'POST',
        body: JSON.stringify({ name, address }),
      });
    },

    getMyClinics: async () => {
      console.log('[CLINIC] getMyClinics');
      return authFetch('/clinics/my-clinics');
    },

    getClinic: async (clinicId) => {
      console.log('[CLINIC] getClinic:', clinicId);
      return authFetch(`/clinics/${clinicId}`);
    },

    addUserToClinic: async (clinicId, userId, role, permissions = []) => {
      console.log('[CLINIC] addUser:', { clinicId, userId, role, permissions });

      return authFetch(`/clinics/${clinicId}/users`, {
        method: 'POST',
        body: JSON.stringify({ userId, role, permissions }),
      });
    },
  },

  // -------- APPOINTMENTS --------
  appointment: {
    book: async (data) => {
      console.log('[APPOINTMENT] book:', data);

      return authFetch('/patient/book', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    myAppointments: async (query = '') => {
      console.log('[APPOINTMENT] myAppointments:', query);
      return authFetch(`/patient/appointments${query}`);
    },
  },

  // -------- QUEUE --------
  queue: {
    add: async (clinicId, doctorUserId, patientProfileId, appointmentId = null) => {
      const payload = {
        clinicId,
        doctorUserId,
        patientProfileId,
        appointmentId,
      };

      console.log('[QUEUE] add:', payload);

      return authFetch('/queue/add', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    patientStatus: async (clinicId, doctorId, patientProfileId) => {
      console.log('[QUEUE] patientStatus:', {
        clinicId,
        doctorId,
        patientProfileId,
      });

      return authFetch(
        `/patient/queue-status?clinicId=${clinicId}&doctorId=${doctorId}&patientProfileId=${patientProfileId}`
      );
    },
  },

  // -------- DOCTOR DASHBOARD --------
  doctor: {
    todayAppointments: async () => {
      console.log('[DOCTOR] todayAppointments');
      return authFetch('/doctor/today-appointments');
    },

    todayQueue: async (clinicId) => {
      console.log('[DOCTOR] todayQueue:', clinicId);
      return authFetch(`/doctor/today-queue?clinicId=${clinicId}`);
    },

    summary: async (clinicId) => {
      console.log('[DOCTOR] summary:', clinicId);
      return authFetch(`/doctor/summary?clinicId=${clinicId}`);
    },

    patients: async (clinicId) => {
      console.log('[DOCTOR] patients:', clinicId);
      return authFetch(`/doctor/patients?clinicId=${clinicId}`);
    },
  },
};

export default api;
