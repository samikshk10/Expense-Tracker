const express = require('express');
const router = express.Router();

// Import the auth controller
const authController = require('../controllers/AuthController');

router.post('/login', authController.handlelogin);
router.post('/signup', authController.handlesignup);

module.exports = router;