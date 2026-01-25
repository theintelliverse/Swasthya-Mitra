import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('PHONE'); // PHONE or OTP
    const { sendOtp, verifyOtpLogin } = useAuth();
    const navigate = useNavigate();
    const [otpId, setOtpId] = useState(null);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const data = await sendOtp(phone);
        if (data) {
            setOtpId(data.otpId);
            setStep('OTP');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await verifyOtpLogin(phone, otp, otpId);
        if (success) {
            navigate('/dashboard/patient'); // Defaulting to patient for now
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-400/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 w-full max-w-md relative z-10 p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                        Swasthya-Mitra
                    </h1>
                    <p className="text-gray-500 mt-2">Your Trusted Health Companion</p>
                </div>

                <h2 className="mb-6 text-xl font-semibold text-gray-700 text-center">
                    {step === 'PHONE' ? 'Welcome Back' : 'Verify Your Identity'}
                </h2>

                {step === 'PHONE' ? (
                    <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                        <div>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide w-full py-3">
                            Send OTP
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-500 text-sm">New user? </span>
                            <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700 hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-500">Logging in as</p>
                                <p className="font-medium text-gray-700">{phone}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep('PHONE')}
                                className="text-xs text-primary-600 hover:underline"
                            >
                                Change
                            </button>
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
                            Verify & Login
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep('PHONE')}
                            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                        >
                            Back to Phone Entry
                        </button>
                    </form>
                )}
            </div>

            <p className="mt-8 text-white/80 text-sm relative z-10 bg-white/70 backdrop-blur-lg border border-white/30 px-4 py-1 rounded-full">
                © 2026 Swasthya-Mitra. Secure & Private.
            </p>
        </div>
    );
}
