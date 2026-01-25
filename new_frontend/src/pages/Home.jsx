import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <h1 className="mb-4 text-4xl font-bold text-blue-800">Swasthya-Mitra</h1>
            <p className="mb-8 text-lg text-gray-600">Smart Healthcare Management System</p>
            <div className="flex gap-4">
                <Link to="/login" className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Login / Register
                </Link>
            </div>
        </div>
    );
}
