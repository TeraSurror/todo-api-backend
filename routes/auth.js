const express = require('express');
const authController = require('../controllers/auth');

const router  = express.Router();

router.get('/', (req, res) => {
    res.json({
        "message" : "auth route"
    });
});

router.post('/', authController.register);

router.post('/auth', authController.login);

module.exports = router;