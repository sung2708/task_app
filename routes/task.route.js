const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/status/:status', taskController.getTasksByStatus);

module.exports = router;
