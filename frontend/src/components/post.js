import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from '../pages/upPost';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUserId = localStorage.getItem('userId');
                if (token) {
                    setUserId(storedUserId);
                    const response = await axios.get('http://localhost:4000/posts', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.delete(`http://localhost:4000/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(posts.filter(post => post.id !== postId));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdate = async (updatedPost) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.put(`http://localhost:4000/posts/${updatedPost.id}`, updatedPost, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(posts.map(post => (post.id === response.data.id ? response.data : post)));
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        userId={userId}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default PostList;
