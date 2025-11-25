// Mock API Service
// Replace these with real fetch/axios calls when connecting to backend

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    auth: {
        login: async (credentials) => {
            await delay(1000);
            return {
                success: true,
                user: {
                    id: '1',
                    name: 'Demo User',
                    role: credentials.role || 'patient'
                },
                token: 'mock-jwt-token'
            };
        },
        register: async (data) => {
            await delay(1000);
            return { success: true, message: 'Registration successful' };
        },
        verifyOtp: async (otp) => {
            await delay(800);
            return { success: true, message: 'OTP Verified' };
        }
    },
    doctor: {
        getStats: async (doctorId) => {
            await delay(500);
            return {
                patientsInQueue: 12,
                avgWaitTime: '18m',
                totalPatients: 45,
                appointments: 8
            };
        },
        toggleEmergency: async (status) => {
            await delay(500);
            return { success: true, isEmergency: status };
        }
    },
    patient: {
        getDashboard: async (patientId) => {
            await delay(500);
            return {
                upcoming: {
                    doctor: 'Dr. Sharma',
                    time: '10:30 AM',
                    wait: '15 mins',
                    position: 3
                },
                vitals: {
                    bp: '120/80',
                    heartRate: '72 bpm',
                    weight: '70 kg'
                }
            };
        }
    },
    admin: {
        getStats: async () => {
            await delay(500);
            return {
                totalClinics: 5,
                activeDoctors: 12,
                totalPatients: 150,
                systemHealth: 'Good'
            };
        }
    }
};
