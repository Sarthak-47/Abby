const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    preferences: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
