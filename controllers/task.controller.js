import taskService from '../services/task.service.js';

const taskController = {
    createTask: async (req, res) => {
        try {
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        } 
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getTaskById : async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            res.status(200).json(task);
        } 
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const tasks = await taskService.getAllTasks(Number(page), Number(limit));
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateTask: async (req, res) => {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);
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
            const { status } = req.params;
            const { page = 1, limit = 10 } = req.query; 
            const tasks = await taskService.getTasksByStatus(status, Number(page), Number(limit));
            res.status(200).json(tasks);
        } 
        catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error.message });
        }
    }
}

export default taskController;
