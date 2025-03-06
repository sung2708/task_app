import userService from '../services/user.service.js'; // Đổi lại tên biến cho đúng chuẩn

const userController = {
    createUser: async function (req, res) { // Đổi lại chữ hoa
        try {
            const result = await userService.createUser(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllUsers: async function (req, res) { // Đổi lại chữ hoa
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserById: async function (req, res) { // Đổi lại chữ hoa
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async function (req, res) {
        try {
            const result = await userService.login(req.body.email, req.body.password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
};

export default userController; // Đảm bảo export đúng tên
