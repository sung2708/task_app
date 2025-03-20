import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Invalid token format' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            if(error.name = 'TokenExpiredError'){
                return res.status(401).json({message: 'Access token expired', expired: true});
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = { userId: decoded.id, role: decoded.role };
        console.log('Authenticated user:', req.user);
        next();
    });
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
        }

        console.log(`User ${req.user.userId} authorized with role ${req.user.role}`);
        next();
    };
};

export { authenticate, authorize };
