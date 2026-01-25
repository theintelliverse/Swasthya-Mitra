const axios = require('axios');

async function testAuth() {
    try {
        console.log('1. Sending OTP...');
        const sendRes = await axios.post('http://localhost:3000/api/auth/send-otp', { phone: '1234567890' });
        console.log('Send Response:', sendRes.data);
        const { otp, otpId } = sendRes.data;

        console.log('2. Verifying OTP...');
        const verifyRes = await axios.post('http://localhost:3000/api/auth/verify-otp', {
            phone: '1234567890',
            otpCode: otp,
            otpId: otpId
        });
        console.log('Verify Response:', verifyRes.data);

        if (verifyRes.data.accessToken) {
            console.log('SUCCESS: Access Token received.');
        } else {
            console.log('FAILED: No Access Token.');
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testAuth();
