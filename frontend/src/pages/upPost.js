import React, { useState } from 'react';

const PostItem = ({ post, onDelete, onUpdate, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image || '');

    const handleDelete = async () => {
        try {
            await onDelete(post.id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedPost = { ...post, content, image };
            await onUpdate(updatedPost);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="post-item">
            {isEditing ? (
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{content}</p>
                    {image && <img src={image} alt="Post" />}
                    <div className="post-actions">
                        {post.user_id === parseInt(userId) && (
                            <>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostItem;
