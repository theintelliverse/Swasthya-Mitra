import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Calendar, Users, Building, Clock, Upload, Home, ArrowRight, MapPin, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

/**
 * RegisterStaffPage Component
 * 
 * Enhanced staff registration with glassmorphic cards.
 * Collects employment details, shift information, and profile.
 */
const RegisterStaffPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        employeeId: '',
        department: '',
        position: '',
        clinicName: '',
        shiftStart: '',
        shiftEnd: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const departments = [
        'Reception', 'Administration', 'Billing', 'Pharmacy',
        'Laboratory', 'Nursing', 'IT Support', 'Housekeeping',
        'Security', 'Maintenance', 'Accounts', 'HR'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            console.log('Registration data:', formData, profileImage);
            navigate('/otp');
        }, 1500);
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
            padding: '2rem 1rem',
            position: 'relative'
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/register')}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    backgroundColor: 'white',
                    color: 'var(--slate-700)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    zIndex: 10
                }}
            >
                <Home size={18} />
                Back
            </button>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <Card glass style={{ padding: '2.5rem' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: '#dbeafe',
                            color: 'var(--info)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <Users size={32} />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Staff Registration</h1>
                        <p style={{ color: 'var(--slate-600)' }}>Join our healthcare team</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Profile Image Upload Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '1.125rem' }}>
                                Profile Image
                            </label>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto 1rem',
                                borderRadius: '50%',
                                border: '3px dashed var(--info)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                transition: 'all var(--transition-normal)'
                            }}
                                onClick={() => document.getElementById('profileImageInput').click()}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.borderColor = 'var(--primary-500)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.borderColor = 'var(--info)';
                                }}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Upload size={32} color="var(--info)" />
                                )}
                            </div>
                            <input
                                type="file"
                                id="profileImageInput"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '0.5rem' }}>
                                Click to upload your photo
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                Max 2MB • JPG, PNG, or WebP
                            </p>
                        </Card>

                        {/* Basic Information Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={20} color="var(--info)" />
                                Basic Information
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input label="Full Name" placeholder="John Doe" icon={User} value={formData.fullName} onChange={(e) => updateFormData('fullName', e.target.value)} required />
                                <Input label="Email" type="email" placeholder="staff@example.com" icon={Mail} value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} required />
                                <Input label="Phone Number" placeholder="1234567890" icon={Phone} value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} required />
                                <Input label="Date of Birth" type="date" icon={Calendar} value={formData.dateOfBirth} onChange={(e) => updateFormData('dateOfBirth', e.target.value)} required />
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Gender <span style={{ color: 'var(--danger)' }}>*</span>
                                    </label>
                                    <select value={formData.gender} onChange={(e) => updateFormData('gender', e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)', fontSize: '0.875rem', backgroundColor: 'white' }}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        {/* Employment Details Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase size={20} color="var(--info)" />
                                Employment Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input label="Employee ID" placeholder="EMP12345" value={formData.employeeId} onChange={(e) => updateFormData('employeeId', e.target.value)} required />
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Department <span style={{ color: 'var(--danger)' }}>*</span>
                                    </label>
                                    <select value={formData.department} onChange={(e) => updateFormData('department', e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)', fontSize: '0.875rem', backgroundColor: 'white' }}>
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}
                                    </select>
                                </div>
                                <Input label="Position/Role" placeholder="Receptionist" value={formData.position} onChange={(e) => updateFormData('position', e.target.value)} required />
                                <Input label="Clinic Name" placeholder="City Hospital" icon={Building} value={formData.clinicName} onChange={(e) => updateFormData('clinicName', e.target.value)} required />
                            </div>

                            {/* Shift Timings */}
                            <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={18} color="var(--info)" />
                                Shift Timings
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input label="Shift Start Time" type="time" icon={Clock} value={formData.shiftStart} onChange={(e) => updateFormData('shiftStart', e.target.value)} required />
                                <Input label="Shift End Time" type="time" icon={Clock} value={formData.shiftEnd} onChange={(e) => updateFormData('shiftEnd', e.target.value)} required />
                            </div>
                        </Card>

                        {/* Emergency Contact Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={20} color="var(--info)" />
                                Emergency Contact
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input label="Contact Name" placeholder="Jane Doe" icon={User} value={formData.emergencyContactName} onChange={(e) => updateFormData('emergencyContactName', e.target.value)} required />
                                <Input label="Contact Phone" placeholder="9876543210" icon={Phone} value={formData.emergencyContactPhone} onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)} required />
                            </div>
                        </Card>

                        {/* Address Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={20} color="var(--info)" />
                                Address
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <Input label="Street Address" placeholder="123 Main Street" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} required />
                                </div>
                                <Input label="City" placeholder="Mumbai" value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} required />
                                <Input label="State" placeholder="Maharashtra" value={formData.state} onChange={(e) => updateFormData('state', e.target.value)} required />
                                <Input label="Pincode" placeholder="400001" value={formData.pincode} onChange={(e) => updateFormData('pincode', e.target.value)} required />
                            </div>
                        </Card>

                        {/* Submit Button */}
                        <Button type="submit" style={{ width: '100%' }} isLoading={isLoading}>
                            Register & Get OTP <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                        Already have an account? <a href="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>Login</a>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default RegisterStaffPage;
