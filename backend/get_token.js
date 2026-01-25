const axios = require('axios');

async function getPatientToken() {
    try {
        const phone = '1234567890';
        // 1. Send OTP
        const otpRes = await axios.post('http://localhost:3000/api/auth/send-otp', { phone });
        const { otpId } = otpRes.data;

        // 2. We can't verify because we don't know OTP. 
        // BUT, I can force a registration via "register" endpoint with PASSWORD if I allow it for patients?
        // `auth.controller.js` register allows password.
        // Let's register a new patient "Test Patient" with password "pass123".

        try {
            await axios.post('http://localhost:3000/api/auth/register', {
                phone: '5555555555',
                password: 'password123',
                name: 'Test Patient',
                role: 'patient'
            });
        } catch (e) {
            // Ignore if exists
        }

        // Login
        const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
            phoneOrEmail: '5555555555',
            password: 'password123'
        });

        console.log('TOKEN:', loginRes.data.accessToken);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

getPatientToken();
