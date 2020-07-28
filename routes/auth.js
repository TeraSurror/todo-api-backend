const express = require('express');
const authController = require('../controllers/auth');

const router  = express.Router();

// Route for registration
router.post('/', authController.register);

// Route for login
router.post('/auth', authController.login);

module.exports = router;