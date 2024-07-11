const express = require('express');
const userController = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.post('/users/login', userController.login);
userRouter.post('/users', userController.signup);

module.exports = userRouter;
