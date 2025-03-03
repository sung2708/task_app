var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

var generateToken = function(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );
};

var userService = {
    createUser: async function(userData) {
        var exists = await User.findOne({ email: userData.email });

        if (exists) throw new Error("User already exists");

        var user = new User(userData);
        await user.save();

        var token = generateToken(user);
        return { user, token };
    },

    getAllUsers: async function() {
        return await User.find().select('-password');
    },

    getUserById: async function(userId) {
        var user = await User.findById(userId).select('-password');
        if (!user) throw new Error("User not found");
        return user;
    },

    login: async function(email, password) {
        var user = await User.findOne({ email });

        if (!user) throw new Error("User not found");

        var isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials!");

        var token = generateToken(user);
        return { user, token };
    }
};

module.exports = userService;
