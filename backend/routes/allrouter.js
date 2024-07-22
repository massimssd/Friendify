const express = require('express');
const userController = require('../controllers/users');
const postController = require('../controllers/post');
const authenticateToken = require('../middelware/auth');
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users/login', userController.login);
router.post('/users/signup', userController.signup);

// Utiliser authenticateToken pour protéger cette route
router.post('/posts', authenticateToken, postController.createPost);

router.get('/posts', postController.getAllPosts);
router.get('/posts/user/:userId', postController.getPostsByUserId);

module.exports = router;
