const express = require('express');
const userController = require('../controllers/users');
const postController = require('../controllers/post');
const authenticateToken = require('../middelware/auth');
const commentController = require('../controllers/comment');
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users/login', userController.login);
router.post('/users/signup', userController.signup);

router.post('/posts', authenticateToken, postController.createPost);
router.delete('/posts/:postId', postController.deletePostById)
router.get('/posts', authenticateToken, postController.getAllPosts);
router.get('/posts/user/:userId', authenticateToken, postController.getPostsByUserId);
router.put('/posts/:postId', postController.updatePost);

router.post('/posts/:postId/comments', authenticateToken, commentController.createComment);
router.get('/comments', authenticateToken ,commentController.getAllComments);
router.get('/posts/:postId/comments',authenticateToken,commentController.getCommentByPostId);

module.exports = router;
