import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useSocket } from '../../context/SocketContext';
import { Clock, CheckCircle, MapPin, Calendar, Search, Stethoscope, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BookingView() {
    const { socket } = useSocket();
    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [queueStatus, setQueueStatus] = useState(null);

    // AI Prediction State
    const [selectedDoctorForPred, setSelectedDoctorForPred] = useState(null);
    const [predProblem, setPredProblem] = useState('');
    const [predEmergency, setPredEmergency] = useState('no');
    const [predResult, setPredResult] = useState(null);
    const [predLoading, setPredLoading] = useState(false);

    const handlePredict = async () => {
        if (!predProblem) {
            toast.error("Please describe the problem");
            return;
        }
        setPredLoading(true);
        try {
            // Construct payload matching api.py requirements
            const payload = {
                emergency: predEmergency,
                doctor_id: selectedDoctorForPred._id,
                doctor_type: selectedDoctorForPred.specialization || "General",
                visit_type: "new", // default
                day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
                time: new Date().toLocaleTimeString('en-US', { hour12: false }), // HH:MM:SS
                clinic_type: "Urban",
                age: 30, // Mock
                gender: "Male", // Mock
                token_no: 5, // Mock
                problem: predProblem
            };

            const res = await api.post('/ai/predict', payload);
            setPredResult(res.data.estimated_wait_time);
        } catch (error) {
            console.error(error);
            toast.error("Prediction failed");
        } finally {
            setPredLoading(false);
        }
    };

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const res = await api.get('/clinics/all');
                setClinics(res.data.clinics);
                if (res.data.clinics.length > 0) {
                    setSelectedClinic(res.data.clinics[0]); // Auto-select first
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch clinics", error);
                setLoading(false);
            }
        };
        fetchClinics();
    }, []);

    useEffect(() => {
        if (!selectedClinic) return;

        const fetchDoctors = async () => {
            try {
                const res = await api.get(`/clinics/${selectedClinic._id}/doctors`);
                setDoctors(res.data.doctors);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
            }
        };
        fetchDoctors();

        // Listen for socket if we are in this clinic context?
        // Actually, we should probably listen if we have an appointment or just generic queue view.
        // For now, let's just listen for QUEUE_UPDATED and maybe refetch status?
        // But status endpoint isn't defined for patients yet properly.
        // Assuming there is a "live status" endpoint or we just show "Current Token".

    }, [selectedClinic]);

    useEffect(() => {
        if (socket) {
            socket.on('QUEUE_UPDATED', (data) => {
                // data might contain clinicId. If matches selectedClinic, update.
                if (selectedClinic && data.clinicId === selectedClinic._id) {
                    toast("Queue Updated", { icon: "🔔" });
                    // fetchLiveStatus(); // TODO: Implement fetchLiveStatus
                }
            });
        }
        return () => socket?.off('QUEUE_UPDATED');
    }, [socket, selectedClinic]);

    const handleBook = async (doctorId) => {
        try {
            // Basic booking for demonstration (defaults to "today" and generic time)
            // Real app would have date/time picker
            const appointmentData = {
                clinicId: selectedClinic._id,
                doctorId: doctorId,
                date: new Date().toISOString().split('T')[0], // Today
                time: "10:00 AM" // Placeholder
            };

            await api.post('/patient/book', appointmentData);
            toast.success('Appointment Booked Successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-primary-600 font-medium">Loading Experience...</div>;

    return (
        <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-between group">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Live Token</p>
                        <p className="text-4xl font-bold text-gray-800 mt-1">#12</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 flex items-center justify-between group">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Your Status</p>
                        <p className="text-xl font-bold text-gray-800 mt-1">No Active Booking</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Clinic Selection */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <MapPin className="text-primary-500" /> Select Clinic
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {clinics.map(clinic => (
                        <div
                            key={clinic._id}
                            onClick={() => setSelectedClinic(clinic)}
                            className={`p-5 rounded-2xl border min-w-[240px] cursor-pointer transition-all duration-300 ${selectedClinic?._id === clinic._id
                                ? 'bg-primary-50 border-primary-500 shadow-lg scale-[1.02]'
                                : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-md'
                                }`}
                        >
                            <h3 className={`font-bold text-lg ${selectedClinic?._id === clinic._id ? 'text-primary-700' : 'text-gray-700'}`}>
                                {clinic.name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate mt-1">{clinic.address}</p>
                        </div>
                    ))}
                    {clinics.length === 0 && <p className="text-gray-500 italic">No clinics found.</p>}
                </div>
            </div>

            {/* Doctor Selection */}
            {selectedClinic && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Stethoscope className="text-primary-500" /> Select Doctor
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map(doctor => (
                            <div key={doctor._id} className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                                        <p className="text-sm font-medium text-primary-600 bg-primary-50 inline-block px-2 py-0.5 rounded mt-1">
                                            {doctor.role}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        <UserIcon />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setSelectedDoctorForPred(doctor)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                                    >
                                        <Sparkles size={16} /> AI Insight: Wait Time
                                    </button>
                                    <button
                                        onClick={() => handleBook(doctor._id)}
                                        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide w-full py-2.5 text-sm"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                        {doctors.length === 0 && (
                            <div className="col-span-full p-10 text-center bg-white/50 rounded-2xl border border-dashed text-gray-500">
                                No doctors available in this clinic right now.
                            </div>
                        )}
                    </div>

                    {/* AI Prediction Modal (Glassmorphism) */}
                    {selectedDoctorForPred && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/50 relative overflow-hidden">
                                {/* Decorative blob */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="text-indigo-600" /> AI Wait Time Prediction
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Analyzing schedule for <span className="font-semibold text-gray-700">{selectedDoctorForPred.name}</span>
                                </p>

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <label className="text-xs font-semibold uppercase text-gray-400">Describe Symptoms</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. High fever, chills..."
                                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm mt-1"
                                            value={predProblem}
                                            onChange={(e) => setPredProblem(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold uppercase text-gray-400">Emergency Status</label>
                                        <div className="flex gap-2 mt-1">
                                            {['no', 'yes'].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setPredEmergency(val)}
                                                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${predEmergency === val
                                                        ? (val === 'yes' ? 'bg-red-100 text-red-600 border-red-200 border' : 'bg-primary-100 text-primary-600 border-primary-200 border')
                                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {val === 'yes' ? 'Emergency' : 'Regular'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {predResult && (
                                        <div className="p-4 bg-gradient-to-br from-indigo-50 to-primary-50 border border-indigo-100 rounded-2xl text-center">
                                            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-primary-600">
                                                {predResult} min
                                            </p>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estimated Wait</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <button
                                            onClick={() => { setSelectedDoctorForPred(null); setPredResult(null); }}
                                            className="px-4 py-2 bg-white text-gray-700 border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300 font-medium py-3 text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handlePredict}
                                            disabled={predLoading}
                                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide py-3 text-sm bg-gradient-to-r from-indigo-500 to-purple-600"
                                        >
                                            {predLoading ? 'Analyzing...' : 'Predict Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
