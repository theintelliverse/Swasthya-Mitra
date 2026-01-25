const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('./configuration/mongoose_connection');
const User = require('./models/users/Usermodel');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_change";

async function genToken() {
    try {
        const user = await User.findOne({ phone: '8888888888' }); // Doctor
        if (user) {
            // Force iat to 0 (1970) to avoid "future token" error in test browser
            const token = jwt.sign({ sub: user._id, iat: 0 }, JWT_ACCESS_SECRET, { expiresIn: "10y" });
            console.log('ACCESS_TOKEN:', token);
            fs.writeFileSync('token.txt', token);
        } else {
            console.log('User not found');
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
genToken();
