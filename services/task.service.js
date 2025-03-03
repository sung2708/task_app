var mongoose = require('mongoose');

var Task = require('../models/task.model')

var taskService = {
    createTask: async (taskData)=>{
        try{
            var task = new Task(taskData);
            await task.save();

            return task;
        }
        catch(error){
            throw new Error(`Error create task ${error.message}`);
        }
    },

    getTaskById: async (taskID)=>{
        try{
            var task = await Task.findById(taskID);

            if(!task) throw new Error ('Task not found');
            return task;
        }
        catch(error){
            throw new Error(`Error fetching task: ${error.message}`)
        }
    },

    getAllTasks: async (page = 1, limit = 10) => {
        try{
            var task = await Task.find()
            .skip((page - 1)*limit)
            .limit(limit);
            return task;
        }
        catch(error){
            throw new Error(`Error fetching Task ${error.message}`);
        }
    },

    updateTask: async (taskID, updateData) => {
        try {
            var task = await Task.findOneAndUpdate({ _id: taskID }, updateData, { new: true });

            if (!task) throw new Error('Task not found');

            return task;
        }
        catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    },

    deleteTask: async (taskId) => {
        try {
            const task = await Task.findByIdAndDelete(taskId);
            if (!task) throw new Error('Task not found');
            return task;
        } 
        catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    },

    getTasksByStatus: async (status, page = 1, limit = 10) => {
        try {
            const tasks = await Task.find( {status} )
                .skip((page - 1) * limit)
                .limit(limit);
            return tasks;
        } 
        catch (error) {
            throw new Error(`Error filtering tasks: ${error.message}`);
        }
    }
};

module.exports = taskService;
