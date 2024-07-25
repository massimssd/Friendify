const pool =require('../controllers/db');

// Fonction pour créer un nouveau commentaire
const createComment = async (postId, userId, content) => {
    const result = await pool.query(
        'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
        [postId, userId, content]
    );
    return result.rows[0];
};


// Fonction pour récupérer tous les commentaires d'une publication
const getCommentsByPostId = async (postId) => {
    const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [postId]);
    return result.rows;
};


// Fonction pour récupérer tous les commentaires
const getAllComments = async () => {
    const result = await pool.query('SELECT * FROM comments');
    return result.rows;
};
module.exports = {
    createComment,
    getAllComments,
    getCommentsByPostId
};