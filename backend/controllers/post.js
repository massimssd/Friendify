const Post = require('../models/post');

const createPost = async (req, res) => {
    const { content, image } = req.body;
    const userId = req.user.userId;

    try {
        const newPost = await Post.createPost(userId, content, image);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error while creating post:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};


const updatePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    const { content, image } = req.body;

    try {
        const post = await Post.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        const updatedPost = await Post.updatePostById(postId, content, image);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error while updating post:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error while fetching posts:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

const getPostsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const posts = await Post.getPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error while fetching user posts:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

const deletePostById = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;

    try {
        const post = await Post.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        await Post.deletePostById(postId);
        res.status(200).json({ message: 'Post supprimé avec succès' });
    } catch (error) {
        console.error('Error while deleting post:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUserId,
    deletePostById
};
