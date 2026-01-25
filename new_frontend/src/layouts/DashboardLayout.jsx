import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, User, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function DashboardLayout({ role }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = {
        patient: [
            { label: 'Booking', path: '/dashboard/patient', icon: <Home size={20} /> },
            { label: 'My Appointments', path: '/dashboard/patient/appointments', icon: <Calendar size={20} /> },
            { label: 'Live Queue', path: '/dashboard/patient/queue', icon: <Clock size={20} /> },
        ],
        doctor: [
            { label: 'Live Queue', path: '/dashboard/doctor', icon: <Clock size={20} /> },
            { label: 'Consultation History', path: '/dashboard/doctor/history', icon: <Calendar size={20} /> },
        ],
        admin: [
            { label: 'Overview', path: '/dashboard/admin', icon: <Home size={20} /> },
            { label: 'Manage Users', path: '/dashboard/admin/users', icon: <User size={20} /> },
        ]
    };

    const currentMenu = menuItems[role] || [];

    return (
        <div className="flex min-h-screen bg-transparent">
            {/* Gradient Overlay for the entire dashboard area handled by body, but adding local effects if needed */}

            {/* Sidebar */}
            <aside className="w-72 bg-white/70 backdrop-blur-lg border border-white/30 m-4 rounded-3xl shadow-premium z-20 flex flex-col transition-all duration-300">
                <div className="p-8 pb-4">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                        Swasthya
                    </h2>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">
                        {role} Portal
                    </p>
                </div>

                <nav className="p-4 space-y-2 flex-1">
                    {currentMenu.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-gray-600 hover:bg-white/50 hover:text-primary-600'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} className="text-white/80" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-4 w-full text-left text-red-500 rounded-2xl hover:bg-red-50/50 transition-colors font-medium group"
                    >
                        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Sign Out</span>
                    </button>

                    <div className="mt-4 px-4 py-3 bg-primary-50/50 rounded-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs ring-2 ring-white">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-700 truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.phone || 'ID: 123'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 h-screen overflow-y-auto overflow-x-hidden relative">
                <header className="flex justify-between items-center mb-8 bg-white/40 sticky top-0 z-10 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/40 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Hello, <span className="text-primary-600">{user?.name?.split(' ')[0] || 'Friend'}</span> 👋
                        </h1>
                        <p className="text-sm text-gray-500">Here's what's happening today.</p>
                    </div>
                </header>

                <div className="animate-fade-in-up">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
