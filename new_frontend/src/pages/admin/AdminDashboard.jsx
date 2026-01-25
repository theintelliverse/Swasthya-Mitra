import { useState, useEffect } from 'react';
import { Users, Activity, Calendar } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalClinics: 1,
        totalDoctors: 5,
        totalPatients: 120,
        activeAppointments: 45
    });

    return (
        <div className="grid gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Clinic Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded shadow border-l-4 border-blue-500">
                    <p className="text-gray-500 text-sm">Total Doctors</p>
                    <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm">Total Patients</p>
                    <p className="text-2xl font-bold">{stats.totalPatients}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-l-4 border-purple-500">
                    <p className="text-gray-500 text-sm">Active Appts</p>
                    <p className="text-2xl font-bold">{stats.activeAppointments}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-l-4 border-orange-500">
                    <p className="text-gray-500 text-sm">Revenue (Today)</p>
                    <p className="text-2xl font-bold">₹ 15,000</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <Activity size={16} className="text-blue-500" />
                            New doctor "Dr. Anjali" added.
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <Activity size={16} className="text-green-500" />
                            Patient #1234 checked in.
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600">
                            <Activity size={16} className="text-red-500" />
                            Appointment #99 cancelled.
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Doctor</button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">View Reports</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
