const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'CLOSED'],
        default: 'ACTIVE'
    },
    endedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
