const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { syncUser, getProfile } = require('../controllers/authController');

router.post('/sync', verifyToken, syncUser);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
