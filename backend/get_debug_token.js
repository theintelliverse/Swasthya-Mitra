const axios = require('axios');

async function getToken() {
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
        phoneOrEmail: '7777777777',
        password: 'pass'
    });
    console.log('TOKEN:', loginRes.data.accessToken);
}
getToken();
