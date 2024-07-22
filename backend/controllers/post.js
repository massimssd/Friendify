const Post = require('../models/post');

// Créer une nouvelle publication
const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.userId; // récupéré depuis le middleware d'authentification

    if (!content) {
        return res.status(400).json({ message: 'Le contenu est requis' });
    }

    try {
        const newPost = await Post.createPost(userId, content);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error while creating post:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur du serveur' });
        }
    }
};
// Récupérer toutes les publications
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error while fetching posts:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// Récupérer les publications d'un utilisateur spécifique
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

module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId
};
