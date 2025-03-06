import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;
