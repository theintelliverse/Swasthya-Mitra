import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, Users, Phone, Calendar, Mail, Building, MapPin, Upload, ArrowRight, Home } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTheme } from '../../hooks/useTheme';

/**
 * RegisterSelectPage Component - Redesigned
 * 
 * Unified registration page with toggle between Doctor and Patient.
 * Uses LoginPage design style with landing page theme.
 */
const RegisterSelectPage = () => {
    const navigate = useNavigate();
    const themeContext = useTheme();
    const theme = themeContext?.theme || 'light';
    const [userType, setUserType] = useState('patient');
    const [isLoading, setIsLoading] = useState(false);

    // Patient form state
    const [patientData, setPatientData] = useState({
        name: '',
        phone: '',
        age: ''
    });

    // Doctor form state
    const [doctorData, setDoctorData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        licenseNumber: '',
        experience: '',
        city: ''
    });

    // Staff form state
    const [staffData, setStaffData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        clinic: '',
        experience: '',
        city: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const specializations = [
        'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician',
        'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Neurologist',
        'Psychiatrist', 'Dentist', 'Ophthalmologist', 'Urologist'
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Only JPG, PNG, and WebP images are allowed');
                return;
            }
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handlePatientSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp');
        }, 1500);
    };

    const handleDoctorSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp');
        }, 1500);
    };

    const handleStaffSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp');
        }, 1500);
    };

    return (
        <>
            <Navbar showAuthButtons={false} />
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme === 'light'
                    ? 'linear-gradient(135deg, #0891b2 0%, #9333ea 100%)'
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: '2rem 1rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(163,230,253,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 20s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(216,180,254,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 15s ease-in-out infinite reverse'
                }}></div>

                <Card glass className="w-full max-w-md" style={{ width: '100%', maxWidth: '500px' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: userType === 'doctor'
                                ? 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)'
                                : userType === 'staff'
                                ? 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)'
                                : 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                            color: 'white',
                            borderRadius: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            boxShadow: userType === 'doctor'
                                ? '0 20px 25px -5px rgba(147, 51, 234, 0.3)'
                                : userType === 'staff'
                                ? '0 20px 25px -5px rgba(234, 88, 12, 0.3)'
                                : '0 20px 25px -5px rgba(8, 145, 178, 0.3)',
                            transform: 'rotate(-5deg)',
                            transition: 'all 0.3s ease'
                        }}>
                            {userType === 'doctor' ? (
                                <Stethoscope size={40} style={{ transform: 'rotate(5deg)' }} />
                            ) : userType === 'staff' ? (
                                <Users size={40} style={{ transform: 'rotate(5deg)' }} />
                            ) : (
                                <User size={40} style={{ transform: 'rotate(5deg)' }} />
                            )}
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#f1f5f9' }}>
                            {userType === 'doctor' ? 'Doctor Registration 🏥' : userType === 'staff' ? 'Staff Registration 👨‍⚕️' : 'Patient Registration 🏨'}
                        </h1>
                        <p style={{ color: theme === 'light' ? '#64748b' : '#cbd5e1', fontSize: '1rem' }}>
                            {userType === 'doctor' ? 'Join our healthcare network' : userType === 'staff' ? 'Join our clinic team' : 'Create your health account'}
                        </p>
                    </div>

                    {/* User Type Selection Toggle */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(51, 65, 85, 0.5)',
                        padding: '0.375rem',
                        borderRadius: '1rem',
                        boxShadow: theme === 'light' ? 'inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        {[
                            { id: 'patient', label: 'Patient', icon: User },
                            { id: 'doctor', label: 'Doctor', icon: Stethoscope },
                            { id: 'staff', label: 'Staff', icon: Users }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setUserType(type.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                    padding: '0.75rem 0.5rem',
                                    borderRadius: '0.75rem',
                                    background: userType === type.id
                                        ? type.id === 'doctor'
                                            ? 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)'
                                            : type.id === 'staff'
                                            ? 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)'
                                            : 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                                        : 'transparent',
                                    color: userType === type.id ? 'white' : theme === 'light' ? '#64748b' : '#94a3b8',
                                    boxShadow: userType === type.id ? '0 4px 6px -1px rgba(0,0,0,0.2)' : 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transform: userType === type.id ? 'scale(1.05)' : 'scale(1)',
                                    border: 'none'
                                }}
                            >
                                <type.icon size={20} />
                                {type.label}
                            </button>
                        ))}
                    </div>

                    {/* Patient Registration Form */}
                    {userType === 'patient' && (
                        <form onSubmit={handlePatientSubmit}>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={User}
                                value={patientData.name}
                                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="Enter your mobile number"
                                icon={Phone}
                                value={patientData.phone}
                                onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                                required
                            />
                            <Input
                                label="Age"
                                type="number"
                                placeholder="Enter your age"
                                icon={Calendar}
                                value={patientData.age}
                                onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                style={{
                                    padding: '1rem',
                                    width: '100%',
                                    marginTop: '1rem',
                                    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                                    boxShadow: '0 4px 6px -1px rgba(8, 145, 178, 0.3)',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                                isLoading={isLoading}
                            >
                                Register & Get OTP <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </form>
                    )}

                    {/* Doctor Registration Form */}
                    {userType === 'doctor' && (
                        <form onSubmit={handleDoctorSubmit}>
                            {/* Profile Image Upload */}
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.875rem', color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>
                                    Profile Photo
                                </label>
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        margin: '0 auto 0.75rem',
                                        borderRadius: '50%',
                                        border: '3px dashed #9333ea',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        backgroundColor: 'rgba(147, 51, 234, 0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => document.getElementById('doctorImageInput').click()}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = '#a855f7';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = '#9333ea';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <Upload size={28} color="#9333ea" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="doctorImageInput"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>Max 2MB • JPG, PNG, or WebP</p>
                            </div>

                            <Input
                                label="Full Name"
                                placeholder="Dr. John Doe"
                                icon={User}
                                value={doctorData.fullName}
                                onChange={(e) => setDoctorData({ ...doctorData, fullName: e.target.value })}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="doctor@example.com"
                                icon={Mail}
                                value={doctorData.email}
                                onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="1234567890"
                                icon={Phone}
                                value={doctorData.phone}
                                onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                                required
                            />

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>
                                    Specialization <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <select
                                    value={doctorData.specialization}
                                    onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(100, 116, 139, 0.5)',
                                        fontSize: '0.875rem',
                                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(51, 65, 85, 0.9)',
                                        color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                        fontWeight: 500
                                    }}
                                >
                                    <option value="">Select Specialization</option>
                                    {specializations.map(spec => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="License Number"
                                placeholder="MCI123456"
                                icon={Stethoscope}
                                value={doctorData.licenseNumber}
                                onChange={(e) => setDoctorData({ ...doctorData, licenseNumber: e.target.value })}
                                required
                            />
                            <Input
                                label="Years of Experience"
                                type="number"
                                placeholder="5"
                                value={doctorData.experience}
                                onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
                                required
                            />
                            <Input
                                label="City"
                                placeholder="Mumbai"
                                icon={MapPin}
                                value={doctorData.city}
                                onChange={(e) => setDoctorData({ ...doctorData, city: e.target.value })}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                style={{
                                    padding: '1rem',
                                    width: '100%',
                                    marginTop: '1rem',
                                    background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
                                    boxShadow: '0 4px 6px -1px rgba(147, 51, 234, 0.3)',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                                isLoading={isLoading}
                            >
                                Register & Get OTP <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </form>
                    )}

                    {/* Staff Registration Form */}
                    {userType === 'staff' && (
                        <form onSubmit={handleStaffSubmit}>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={User}
                                value={staffData.fullName}
                                onChange={(e) => setStaffData({ ...staffData, fullName: e.target.value })}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="staff@example.com"
                                icon={Mail}
                                value={staffData.email}
                                onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone Number"
                                placeholder="1234567890"
                                icon={Phone}
                                value={staffData.phone}
                                onChange={(e) => setStaffData({ ...staffData, phone: e.target.value })}
                                required
                            />
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>
                                    Position <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <select
                                    value={staffData.position}
                                    onChange={(e) => setStaffData({ ...staffData, position: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(100, 116, 139, 0.5)',
                                        fontSize: '0.875rem',
                                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(51, 65, 85, 0.9)',
                                        color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                        fontWeight: 500
                                    }}
                                >
                                    <option value="">Select Position</option>
                                    <option value="Receptionist">Receptionist</option>
                                    <option value="Nurse">Nurse</option>
                                    <option value="Medical Assistant">Medical Assistant</option>
                                    <option value="Lab Technician">Lab Technician</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Pharmacist">Pharmacist</option>
                                </select>
                            </div>
                            <Input
                                label="Clinic Name"
                                placeholder="Clinic/Hospital Name"
                                icon={Building}
                                value={staffData.clinic}
                                onChange={(e) => setStaffData({ ...staffData, clinic: e.target.value })}
                                required
                            />
                            <Input
                                label="Years of Experience"
                                type="number"
                                placeholder="2"
                                value={staffData.experience}
                                onChange={(e) => setStaffData({ ...staffData, experience: e.target.value })}
                                required
                            />
                            <Input
                                label="City"
                                placeholder="Mumbai"
                                icon={MapPin}
                                value={staffData.city}
                                onChange={(e) => setStaffData({ ...staffData, city: e.target.value })}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                style={{
                                    padding: '1rem',
                                    width: '100%',
                                    marginTop: '1rem',
                                    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                                    boxShadow: '0 4px 6px -1px rgba(234, 88, 12, 0.3)',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                                isLoading={isLoading}
                            >
                                Register & Get OTP <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </form>
                    )}

                    {/* Login Link */}
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme === 'light' ? '#64748b' : '#cbd5e1' }}>
                        Already have an account? <a href="/login" style={{ color: theme === 'light' ? '#0891b2' : '#67e8f9', fontWeight: 600, textDecoration: 'none' }}>Login</a>
                    </p>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default RegisterSelectPage;
