const mongoose = require('./configuration/mongoose_connection');
const ClinicUser = require('./models/users/ClinicUsermodel');
const User = require('./models/users/Usermodel');
const Clinic = require('./models/users/Clinicmodel');

async function check() {
    try {
        const users = await User.find({});
        console.log('Users:', users.map(u => ({ id: u._id, phone: u.phone })));

        const clinics = await Clinic.find({});
        console.log('Clinics:', clinics.map(c => ({ id: c._id, name: c.name })));

        const cus = await ClinicUser.find({});
        console.log('ClinicUsers:', cus);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
