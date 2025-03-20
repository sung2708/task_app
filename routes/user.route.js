import express from 'express';
import userController from '../controllers/user.controller.js';
import { authorize, authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/all', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/logout', authenticate, userController.logout);
router.post("/refresh-token", userController.refreshToken);

export default router;
