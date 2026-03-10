const admin = require('../utils/firebaseAdmin');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // contains firebase uid, email, etc.

        // Also fetch the user from our DB to attach MongoDB ObjectId if needed
        const dbUser = await User.findOne({ firebaseUid: decodedToken.uid });
        if (dbUser) {
            req.dbUser = dbUser;
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = { verifyToken };
