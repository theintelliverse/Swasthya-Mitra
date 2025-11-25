import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Calendar, Stethoscope, Building, MapPin, Upload, Home, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

/**
 * RegisterDoctorPage Component
 * 
 * Comprehensive doctor registration form.
 * Collects professional details, credentials, and profile information.
 */
const RegisterDoctorPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        licenseNumber: '',
        specialization: '',
        experience: '',
        hospitalName: '',
        city: '',
        state: '',
        pincode: '',
        bio: '',
        consultationFee: '', // Optional
        availableDays: []
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const specializations = [
        'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician',
        'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Neurologist',
        'Psychiatrist', 'Dentist', 'Ophthalmologist', 'Urologist',
        'Gastroenterologist', 'Pulmonologist', 'Nephrologist', 'Endocrinologist',
        'Oncologist', 'Radiologist', 'Anesthesiologist', 'Pathologist',
        'Rheumatologist', 'Allergist', 'Sports Medicine', 'Emergency Medicine'
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }

            // Validate file type
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

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Registration data:', formData, profileImage);
            navigate('/otp'); // Navigate to OTP verification
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
            {/* Back to Home Button */}
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
                    transition: 'all var(--transition-normal)',
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
                            backgroundColor: 'var(--secondary-100)',
                            color: 'var(--secondary-600)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <Stethoscope size={32} />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Doctor Registration</h1>
                        <p style={{ color: 'var(--slate-600)' }}>Join our healthcare network</p>
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
                                border: '3px dashed var(--primary-300)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                position: 'relative',
                                transition: 'all var(--transition-normal)'
                            }}
                                onClick={() => document.getElementById('profileImageInput').click()}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary-500)';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary-300)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Upload size={32} color="var(--primary-500)" />
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
                                <User size={20} color="var(--secondary-600)" />
                                Basic Information
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input
                                    label="Full Name"
                                    placeholder="Dr. John Doe"
                                    icon={User}
                                    value={formData.fullName}
                                    onChange={(e) => updateFormData('fullName', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="doctor@example.com"
                                    icon={Mail}
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    placeholder="1234567890"
                                    icon={Phone}
                                    value={formData.phone}
                                    onChange={(e) => updateFormData('phone', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    icon={Calendar}
                                    value={formData.dateOfBirth}
                                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                                    required
                                />
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Gender <span style={{ color: 'var(--danger)' }}>*</span>
                                    </label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => updateFormData('gender', e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--slate-300)',
                                            fontSize: '0.875rem',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </Card>

                        {/* Professional Information Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Stethoscope size={20} color="var(--secondary-600)" />
                                Professional Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <Input
                                    label="Medical License Number"
                                    placeholder="MCI123456"
                                    icon={Stethoscope}
                                    value={formData.licenseNumber}
                                    onChange={(e) => updateFormData('licenseNumber', e.target.value)}
                                    required
                                />
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Specialization <span style={{ color: 'var(--danger)' }}>*</span>
                                    </label>
                                    <select
                                        value={formData.specialization}
                                        onChange={(e) => updateFormData('specialization', e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--slate-300)',
                                            fontSize: '0.875rem',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <option value="">Select Specialization</option>
                                        {specializations.map(spec => (
                                            <option key={spec} value={spec}>{spec}</option>
                                        ))}
                                    </select>
                                </div>
                                <Input
                                    label="Years of Experience"
                                    type="number"
                                    placeholder="5"
                                    value={formData.experience}
                                    onChange={(e) => updateFormData('experience', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Consultation Fee (Optional)"
                                    type="number"
                                    placeholder="500"
                                    value={formData.consultationFee}
                                    onChange={(e) => updateFormData('consultationFee', e.target.value)}
                                />
                            </div>
                        </Card>

                        {/* Practice Details Card */}
                        <Card glass style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Building size={20} color="var(--secondary-600)" />
                                Practice Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Input
                                    label="Hospital/Clinic Name"
                                    placeholder="City Hospital"
                                    icon={Building}
                                    value={formData.hospitalName}
                                    onChange={(e) => updateFormData('hospitalName', e.target.value)}
                                    required
                                />
                                <Input
                                    label="City"
                                    placeholder="Mumbai"
                                    icon={MapPin}
                                    value={formData.city}
                                    onChange={(e) => updateFormData('city', e.target.value)}
                                    required
                                />
                                <Input
                                    label="State"
                                    placeholder="Maharashtra"
                                    value={formData.state}
                                    onChange={(e) => updateFormData('state', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Pincode"
                                    placeholder="400001"
                                    value={formData.pincode}
                                    onChange={(e) => updateFormData('pincode', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                                    About Yourself
                                </label>
                                <textarea
                                    placeholder="Brief introduction about your practice and expertise..."
                                    value={formData.bio}
                                    onChange={(e) => updateFormData('bio', e.target.value)}
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--slate-300)',
                                        fontSize: '0.875rem',
                                        resize: 'vertical',
                                        backgroundColor: 'white'
                                    }}
                                />
                            </div>
                        </Card>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            style={{ width: '100%' }}
                            isLoading={isLoading}
                        >
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

export default RegisterDoctorPage;
