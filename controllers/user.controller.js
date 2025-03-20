import userService from '../services/user.service.js';

const userController = {
    createUser: async function (req, res) {
        try {
            const { email, name, password } = req.body;
            if (!email || !name || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const { user, accessToken, refreshToken } = await userService.createUser({email, name, password});
            res.status(201).json({
                message: 'User registered successfully',
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllUsers: async function (req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserById: async function (req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async function (req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Missing email or password' });
            }
            const { user, accessToken, refreshToken } = await userService.login(email, password);
            res.json({
                message: 'Login successful',
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    logout: async function (req, res) {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'Missing userId' });
            }
            await userService.logout(userId);
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    refreshToken: async function (req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: "Refresh token is required" });
            }

            const { accessToken, newRefreshToken } = await userService.refreshToken(refreshToken);
            res.json({ accessToken, refreshToken: newRefreshToken });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
};

export default userController;
