const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

router.get('/list', taskController.viewTask);

router.post('/', taskController.addTask);

module.exports = router;