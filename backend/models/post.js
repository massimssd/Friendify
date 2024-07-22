const pool = require('../controllers/db');

// Fonction pour créer une nouvelle publication
const createPost = async (userId, content) => {
    const result = await pool.query(
        'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
        [userId, content]
    );
    return result.rows[0]; // Assurez-vous de renvoyer le résultat
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

module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId
};
