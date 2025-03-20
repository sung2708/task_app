import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


const generateAccesstoken = (user) =>{
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    );
};

const refreshToken = (user) =>{
    return jwt.sign(
        {id: user._id, role:user.role}, 
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_REFRESH},
    );
};

export {generateAccesstoken, refreshToken}
