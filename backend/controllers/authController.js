const User = require('../models/User');

exports.syncUser = async (req, res) => {
    try {
        const { uid, email, name } = req.user; // from firebase token verify

        let user = await User.findOne({ firebaseUid: uid });
        if (!user) {
            user = new User({
                firebaseUid: uid,
                email: email,
                name: name || email.split('@')[0], // fallback if name not provided
            });
            await user.save();
        }

        res.status(200).json({ message: 'User synced successfully', user });
    } catch (error) {
        console.error('Sync user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        if (!req.dbUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(req.dbUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
