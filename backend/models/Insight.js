const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    period: {
        type: String,
        enum: ['weekly', 'monthly'],
        default: 'weekly'
    },
    topEmotions: {
        type: [String],
        default: []
    },
    aiSummary: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Insight', insightSchema);
