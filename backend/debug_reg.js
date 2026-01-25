const axios = require('axios');

async function debug() {
    try {
        console.log('Registering...');
        const res = await axios.post('http://localhost:3000/api/auth/register', {
            phone: '7777777777',
            password: 'pass',
            name: 'Debug User',
            role: 'patient'
        });
        console.log('Register Result:', res.data);
    } catch (e) {
        console.error('Register Failed:', e.response?.data || e.message);
    }
}

debug();
