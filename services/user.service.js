import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = function(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );
};

const userService = {
    createUser: async function(userData) {
        const exists = await User.findOne({ email: userData.email });

        if (exists) throw new Error("User already exists");

        const user = new User(userData);
        await user.save();

        const token = generateToken(user);
        return { user, token };
    },

    getAllUsers: async function() {
        return await User.find().select('-password');
    },

    getUserById: async function(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error("User not found");
        return user;
    },

    login: async function(email, password) {
        const user = await User.findOne({ email });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials!");

        const token = generateToken(user);
        return { user, token };
    }
};

export default userService;
