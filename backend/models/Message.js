const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: String,
        enum: ['USER', 'AI', 'SYSTEM'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    emotionDetected: {
        type: String,
        default: 'unknown'
    },
    isCrisis: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
