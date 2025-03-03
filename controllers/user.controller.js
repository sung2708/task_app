var userService = require('../services/user.service');

var userController = {
    createUser: async function(req, res) {
        try {
            var result = await userService.createUser(req.body);
            res.status(201).json(result); // ✅ Trả về { user, token }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllUsers: async function(req, res) {
        try {
            var users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserById: async function(req, res) {
        try {
            var user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async function(req, res) {
        try {
            var result = await userService.login(req.body.email, req.body.password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
};

module.exports = userController;
