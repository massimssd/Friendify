const pool = require('../controllers/db');

// Fonction pour créer une nouvelle publication
const createPost = async (userId, text, image) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, content, image) VALUES ($1, $2, $3) RETURNING *',
        [userId, text, image]
    );
    return result.rows[0];
};

const getAllPosts = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};

const getPostsByUserId = async (userId) => {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [userId]);
    return result.rows;
};

const deletePostById = async (postId) => {
    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
};

const updatePostById = async (postId, text, image) => {
    const result = await pool.query('UPDATE posts SET content = $2, image = $3 WHERE id = $1 RETURNING *', [postId, text, image]);
    return result.rows[0];
};
module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    deletePostById,
    updatePostById
};
