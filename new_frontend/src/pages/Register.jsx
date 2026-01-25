import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        role: 'patient', // Default role
    });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('DETAILS'); // DETAILS or OTP
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/send-otp', { phone: formData.phone });
            setStep('OTP');
            toast.success('OTP Sent');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/verify-otp', { phone: formData.phone, otp });
            await api.post('/auth/register', formData);
            toast.success('Registered successfully! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary-400/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 w-full max-w-md relative z-10 p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-primary-600">
                        Join Swasthya-Mitra
                    </h1>
                    <p className="text-gray-500 mt-2">Start your wellness journey today</p>
                </div>

                {step === 'DETAILS' ? (
                    <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Rahul Kumar"
                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="e.g. 9876543210"
                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">I am a</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['patient', 'doctor', 'staff'].map(role => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className={`py-2 rounded-xl text-sm font-medium transition-all ${formData.role === role
                                            ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide w-full py-3 mt-4">
                            Proceed to Verify
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-gray-500 text-sm">Already a member? </span>
                            <Link to="/login" className="text-secondary-600 font-medium hover:text-secondary-700 hover:underline">
                                Login Here
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 text-center">
                            <p className="text-sm text-gray-500">OTP sent to</p>
                            <p className="font-bold text-gray-800 text-lg">{formData.phone}</p>
                        </div>

                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm text-center tracking-widest text-lg font-bold"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide w-full py-3 from-green-500 to-emerald-600">
                            Create Account
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep('DETAILS')}
                            className="text-sm text-gray-500 hover:text-gray-700 mt-2 text-center"
                        >
                            Back to Details
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
