var express = require('express');
var userController = require('../controllers/user.controller');

var router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;

