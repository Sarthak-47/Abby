const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', verifyToken, dashboardController.getSummary);

module.exports = router;
