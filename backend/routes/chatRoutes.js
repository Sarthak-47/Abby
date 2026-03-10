const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.post('/send', verifyToken, chatController.sendMessage);
router.get('/history', verifyToken, chatController.getChatHistory);

module.exports = router;
