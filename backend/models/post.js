const pool = require('../controllers/db');

// Fonction pour créer une nouvelle publication
const createPost = async (userId, content) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
        [userId, content]
    );
    return result.rows[0];
};

// Fonction pour récupérer toutes les publications
const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};

// Fonction pour récupérer les publications par utilisateur
const getPostsByUserId = async (userId) => {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [userId]);
    return result.rows;
};

const deletePostById = async(postId)=>{
    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
};

const updatePostById = async (postId, newContent) => {
    const result = await pool.query('UPDATE posts SET content = $2 WHERE id = $1 RETURNING *', [postId, newContent]);
    return result.rows[0];
};


module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    deletePostById,
    updatePostById
};
