const Comment =  require ('../models/comment');

const createComment = async (req, res) => {
    const content = req.body;
    const postId = req.params.postId;
    const userId = req.user.userId;

    try {
        // Assurez-vous que postId est un entier
        const newComment = await Comment.createComment(parseInt(postId, 10), userId, content);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error while creating comment:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur du serveur' });
        }
    }
};
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error while fetching all comments:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
const getCommentByPostId = async(req,res)=>{
    const postId = req.params.postId;
    try{
        const postComment = await Comment.getCommentsByPostId(postId);
        res.status(200).json(postComment);
    }catch (error){
        console.error('Error while fetching comments:',error.message);
        res.sendStatus(500).json({message:'Erreur du serveur'});
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentByPostId
};
