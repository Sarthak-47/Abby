const Message = require('../models/Message');
const Session = require('../models/Session');
const { detectEmotion, detectCrisis } = require('../services/emotionService');
const { buildTherapyPrompt, buildCrisisPrompt } = require('../ai/promptBuilder');
const { generateReply } = require('../services/geminiService');

exports.sendMessage = async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        const userId = req.dbUser._id;

        if (!message) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

        let activeSession = null;
        if (sessionId) {
            activeSession = await Session.findById(sessionId);
        }
        if (!activeSession) {
            activeSession = new Session({ userId, status: 'ACTIVE' });
            await activeSession.save();
        }

        const isCrisis = detectCrisis(message);
        let emotion = 'neutral';
        if (!isCrisis) {
            emotion = await detectEmotion(message);
        }

        const userMsg = new Message({
            sessionId: activeSession._id,
            userId,
            sender: 'USER',
            content: message,
            emotionDetected: emotion,
            isCrisis
        });
        await userMsg.save();

        const history = await Message.find({ sessionId: activeSession._id })
            .sort({ createdAt: 1 })
            .limit(10);

        let replyText = '';
        if (isCrisis) {
            const prompt = buildCrisisPrompt();
            replyText = await generateReply(`${prompt}\n\nUser: ${message}`);
        } else {
            const prompt = buildTherapyPrompt({
                userMessage: message,
                emotion,
                history,
                userName: req.dbUser.name
            });
            replyText = await generateReply(prompt);
        }

        const aiMsg = new Message({
            sessionId: activeSession._id,
            userId,
            sender: 'AI',
            content: replyText,
            emotionDetected: 'neutral'
        });
        await aiMsg.save();

        res.status(200).json({
            userMessage: userMsg,
            aiResponse: aiMsg,
            sessionId: activeSession._id
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.dbUser._id;
        const { sessionId } = req.query;

        let query = { userId };
        if (sessionId) {
            query.sessionId = sessionId;
        } else {
            const latestSession = await Session.findOne({ userId }).sort({ createdAt: -1 });
            if (latestSession) {
                query.sessionId = latestSession._id;
            } else {
                return res.status(200).json({ messages: [], sessionId: null });
            }
        }

        const messages = await Message.find(query).sort({ createdAt: 1 });
        res.status(200).json({ messages, sessionId: query.sessionId });
    } catch (error) {
        console.error('Get history error', error);
        res.status(500).json({ error: 'Failed to retrieve history' });
    }
};
