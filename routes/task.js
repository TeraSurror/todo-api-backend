const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

// Route for listing all tasks for a specified agent_id
router.get('/list', taskController.viewTask);

// Route for adding a task for a specified agent_id
router.post('/', taskController.addTask);

module.exports = router;