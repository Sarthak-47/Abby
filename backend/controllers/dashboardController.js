const Message = require('../models/Message');
const Insight = require('../models/Insight');
const { generateReply } = require('../services/geminiService');

exports.getSummary = async (req, res) => {
    try {
        const userId = req.dbUser._id;

        // Fetch messages from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const messages = await Message.find({
            userId,
            createdAt: { $gte: oneWeekAgo },
            sender: 'USER'
        });

        // Calculate emotion distribution
        const emotionCounts = {};
        messages.forEach(msg => {
            const e = msg.emotionDetected || 'neutral';
            emotionCounts[e] = (emotionCounts[e] || 0) + 1;
        });

        // Check if we already have an insight generated today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        let currentInsight = await Insight.findOne({
            userId,
            createdAt: { $gte: todayStart }
        });

        // Generate new insight if we have some messages and no insight today
        if (!currentInsight && messages.length > 0) {
            const topEmotions = Object.entries(emotionCounts)
                .sort((a, b) => b[1] - a[1])
                .map(e => e[0])
                .slice(0, 3); // top 3

            const prompt = `You are an AI therapist analyzing a user's weekly mood data.
Their top emotions this week have been: ${topEmotions.join(', ')}.
Provide a very short, supportive, and insightful observation (max 2 sentences) about their emotional trend and a tiny suggestion for self-care.`;

            const aiSummary = await generateReply(prompt);

            currentInsight = new Insight({
                userId,
                period: 'weekly',
                topEmotions,
                aiSummary
            });
            await currentInsight.save();
        }

        res.status(200).json({
            emotionCounts,
            totalMessages: messages.length,
            insight: currentInsight || null
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
};
