const mongoose = require('./configuration/mongoose_connection');
const User = require('./models/users/Usermodel');
const Clinic = require('./models/users/Clinicmodel');
const ClinicUser = require('./models/users/ClinicUsermodel');
const UserProfile = require('./models/users/UserProfilemodel');
const AuthProvider = require('./models/users/AuthProvidermodel');

async function seed() {
    try {
        console.log('--- SEEDING DIRECT ---');

        // Clear existing (optional, but good for idempotency if we handle it)
        // await User.deleteMany({});
        // await Clinic.deleteMany({});

        // 1. Create Owner
        const ownerPhone = '9999999999';
        let owner = await User.findOne({ phone: ownerPhone });
        if (!owner) {
            owner = await User.create({ phone: ownerPhone, isPhoneVerified: true });
            console.log('Owner Created');
        }

        // 2. Create Clinic
        let clinic = await Clinic.findOne({ name: 'Swasthya Setup Clinic' });
        if (!clinic) {
            clinic = await Clinic.create({
                name: 'Swasthya Setup Clinic',
                address: '123 Health St',
                type: 'General',
                ownerUserId: owner._id
            });
            console.log('Clinic Created');
        }

        // 3. Add Owner to Clinic as Admin
        await ClinicUser.findOneAndUpdate(
            { clinicId: clinic._id, userId: owner._id },
            { role: 'admin', isActive: true, permissions: ['all'] },
            { upsert: true }
        );

        // 4. Create Doctor
        const docPhone = '8888888888';
        let doc = await User.findOne({ phone: docPhone });
        if (!doc) {
            doc = await User.create({ phone: docPhone, isPhoneVerified: true });
            await UserProfile.create({ userId: doc._id, name: 'Dr. Arjun', patientType: 'doctor' });
            console.log('Doctor Created');
        }

        const Appointment = require('./models/appointments/AppointmentModel');
        const Queue = require('./models/queue/QueueModel');

        // 5. Add Doctor to Clinic
        await ClinicUser.findOneAndUpdate(
            { clinicId: clinic._id, userId: doc._id },
            { role: 'doctor', isActive: true },
            { upsert: true }
        );
        console.log('Doctor Added to Clinic');

        // 6. Create Test Patients & Appointments
        const patientPhone = '5555555555';
        let patient = await User.findOne({ phone: patientPhone });
        if (!patient) {
            patient = await User.create({ phone: patientPhone, isPhoneVerified: true });
        }
        let patientProfile = await UserProfile.findOne({ userId: patient._id });
        if (!patientProfile) {
            patientProfile = await UserProfile.create({ userId: patient._id, name: 'Rohan Das', patientType: 'patient' });
        }

        // Create 2 Appointments for today
        const today = new Date();
        const appt1 = await Appointment.create({
            clinicId: clinic._id,
            doctorUserId: doc._id,
            patientProfileId: patientProfile._id,
            startTime: new Date(today.setHours(10, 0, 0, 0)),
            status: 'checked_in',
            type: 'walkin'
        });

        const appt2 = await Appointment.create({
            clinicId: clinic._id,
            doctorUserId: doc._id,
            patientProfileId: patientProfile._id,
            startTime: new Date(today.setHours(10, 30, 0, 0)),
            status: 'scheduled',
            type: 'online'
        });

        // Add appt1 to Queue
        await Queue.create({
            clinicId: clinic._id,
            doctorUserId: doc._id,
            patientProfileId: patientProfile._id,
            appointmentId: appt1._id,
            queueNumber: 1,
            status: 'waiting',
            checkInTime: new Date()
        });

        console.log('Appointments & Queue seeded');

        console.log('--- SEEDING COMPLETE ---');
        process.exit(0);

    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
}

seed();
