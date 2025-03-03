var taskService = require('../services/task.service');

var createTask = async (req, res) => {
    try {
        var task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
var getTaskById = async (req, res) => {
    try {
        var task = await taskService.getTaskById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

var getAllTasks = async (req, res) => {
    try {
        var { page, limit } = req.query;
        var tasks = await taskService.getAllTasks(Number(page), Number(limit));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

var updateTask = async (req, res) => {
    try {
        var task = await taskService.updateTask(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

var deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

var getTasksByStatus = async (req, res) => {
    try {
        var { status } = req.params;
        var { page = 1, limit = 10 } = req.query; 

        var tasks = await taskService.getTasksByStatus(status, Number(page), Number(limit));

        console.log("Tasks found:", tasks);

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,
    getTasksByStatus
};
