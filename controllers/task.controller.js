var taskService = require('../services/task.service');

var taskController = {
    createTask: async (req, res) => {
        try {
            var task = await taskService.createTask(req.body);
            res.status(201).json(task);
        } 
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getTaskById : async (req, res) => {
        try {
            var task = await taskService.getTaskById(req.params.id);
            res.status(200).json(task);
        } 
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            var { page, limit } = req.query;
            var tasks = await taskService.getAllTasks(Number(page), Number(limit));
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateTask: async (req, res) => {
        try {
            var task = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } 
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteTask: async (req, res) => {
        try {
            await taskService.deleteTask(req.params.id);
            res.status(204).send();
        }     
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getTasksByStatus: async (req, res) => {
        try {
            var { status } = req.params;
            var { page = 1, limit = 10 } = req.query; 
            var tasks = await taskService.getTasksByStatus(status, Number(page), Number(limit));
            res.status(200).json(tasks);
        } 
        catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = taskController;
