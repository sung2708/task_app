import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { refreshToken, generateAccesstoken } from '../ultis/jwt.js';
import redisClient from '../config/redis.js';

dotenv.config();

const userService = {
    createUser: async function (userData) {
        try {
            const exists = await User.findOne({ email: userData.email });
            if (exists) throw new Error("User already exists");

            const user = new User(userData);
            await user.save();

            const accessToken = generateAccesstoken(user);
            const newRefreshToken = refreshToken(user);
            await redisClient.set(`refresh_${user._id}`, newRefreshToken, 'EX', 7 * 24 * 60 * 60);

            return { user, accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getAllUsers: async function () {
        try {
            return await User.find().select('-password');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getUserById: async function (userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    login: async function (email, password) {
        try {
            const user = await User.findOne({email});
            if (!user) throw new Error("User not found");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials!");

            const accessToken = generateAccesstoken(user); 
            const newRefreshToken = refreshToken(user);
            await redisClient.set(`refresh_${user._id}`, newRefreshToken, 'EX', 7 * 24 * 60 * 60);

            return { user, accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logout: async function (userId) {
        try {
            await redisClient.del(`refresh_${userId}`);
            return { message: 'Logged out successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    refreshToken: async function(oldRefreshToken){
        try{
            const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.id);

            if(!user) throw new Error('User not found');

            const storedToken = await redisClient.get(`refresh_${user._id}`);
            if (storedToken !== oldRefreshToken) throw new Error("Invalid refresh token");

            const newAccessToken = generateAccesstoken(user);
            const newRefreshToken = refreshToken(user);

            await redisClient.set(`refresh_${user._id}`, newRefreshToken, "EX", 7 * 24 * 60 * 60);

            return { accessToken: newAccessToken, newRefreshToken };
        } catch (error) {
            throw new Error("Invalid or expired refresh token");
        }
    },
};

export default userService;
