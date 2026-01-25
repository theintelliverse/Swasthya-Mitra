import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useSocket } from '../../context/SocketContext';
import { Users, Clock, Play, Pause, FastForward, CheckCircle, Activity, ClipboardList } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DoctorQueue() {
    const { socket } = useSocket();
    const [queue, setQueue] = useState({
        current: null,
        waiting: []
    });

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        avgTime: '0 min'
    });

    const [consultationNotes, setConsultationNotes] = useState("");

    const fetchQueue = async () => {
        try {
            const clinicsRes = await api.get('/clinics/my-clinics');
            if (clinicsRes.data.clinics.length > 0) {
                const clinicId = clinicsRes.data.clinics[0].clinic._id;

                const res = await api.get(`/doctor/today-queue?clinicId=${clinicId}`);
                setQueue({
                    current: res.data.current,
                    waiting: res.data.waiting
                });

                const summaryRes = await api.get(`/doctor/summary?clinicId=${clinicId}`);
                setStats({
                    total: summaryRes.data.total,
                    completed: summaryRes.data.completed,
                    avgTime: `${Math.round(summaryRes.data.avgWaitMinutes || 0)} min`
                });
            }
        } catch (error) {
            console.error("Queue fetch error", error);
        }
    };

    useEffect(() => {
        fetchQueue();

        if (socket) {
            socket.on('QUEUE_UPDATED', () => {
                fetchQueue();
                toast.success('Queue Updated');
            });
        }
        return () => socket?.off('QUEUE_UPDATED');
    }, [socket]);

    const handleAction = async (action) => {
        const clinicsRes = await api.get('/clinics/my-clinics');
        if (clinicsRes.data.clinics.length > 0) {
            const clinicId = clinicsRes.data.clinics[0].clinic._id;
            let notes = consultationNotes;

            try {
                await api.post('/doctor/queue/action', { action, clinicId, notes });
                toast.dismiss();
                toast.success(`Action: ${action} processed`);
                if (action === 'COMPLETE') {
                    setConsultationNotes("");
                }
            } catch (error) {
                toast.error('Action failed');
                console.error(error);
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 flex items-center gap-4 group">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 flex items-center gap-4 group">
                    <div className="p-4 bg-pink-50 text-pink-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Time</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.avgTime}</p>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-6 flex items-center gap-4 group">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Patient - 2/3 width */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Activity className="text-primary-500" /> Current Consultation
                        </h2>
                    </div>

                    {/* Active Patient Card */}
                    {queue.current ? (
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-8 border-l-4 border-l-primary-500 relative overflow-hidden bg-white/90">
                            {/* Status Badge */}
                            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> In Progress
                            </div>

                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{queue.current.patientProfileId?.name || 'Unknown'}</h3>
                                <p className="text-lg text-primary-600 font-medium mt-1">Token #{queue.current.tokenNumber}</p>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                    <ClipboardList size={16} /> Consultation Notes
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm min-h-[120px] resize-none text-base"
                                    placeholder="Enter diagnosis, prescription, or clinical notes..."
                                    value={consultationNotes}
                                    onChange={(e) => setConsultationNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => handleAction('COMPLETE')}
                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Complete Visit
                                </button>
                                <button
                                    onClick={() => handleAction('PAUSE')}
                                    className="px-6 py-3 bg-white text-orange-500 border border-orange-200 rounded-xl font-bold hover:bg-orange-50 transition-colors flex items-center gap-2"
                                >
                                    <Pause size={20} /> Pause
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-12 text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Users className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-xl font-medium text-gray-600">No patient in consultation</h3>
                            <button
                                onClick={() => handleAction('NEXT')}
                                className="mt-6 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 font-semibold tracking-wide inline-flex items-center gap-2 px-8 py-3 text-lg"
                            >
                                <Play size={20} /> Call Next Patient
                            </button>
                        </div>
                    )}

                    {/* Controls */}
                    {queue.current && (
                        <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl border border-white/40 shadow-sm backdrop-blur">
                            <span className="text-gray-500 text-sm font-mono">Session Active</span>
                            <button
                                onClick={() => handleAction('SKIP')}
                                className="text-red-500 hover:text-red-600 text-sm font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <FastForward size={16} /> Skip Patient
                            </button>
                        </div>
                    )}
                </div>

                {/* Up Next - 1/3 width */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Clock className="text-primary-500" /> Up Next
                    </h2>
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-500 p-4 min-h-[400px] overflow-y-auto">
                        <div className="space-y-3">
                            {queue.waiting.map((item, index) => (
                                <div key={item._id} className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-primary-200 transition-colors group flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm border">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-gray-700">{item.patientProfileId?.name}</p>
                                            <p className="text-xs text-primary-600 font-medium bg-primary-50 inline-block px-1.5 rounded mt-0.5">Token #{item.tokenNumber}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">
                                        {new Date(item.appointmentId?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}
                            {queue.waiting.length === 0 && (
                                <div className="text-center py-10 text-gray-400">
                                    <p>Queue is cleared!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
