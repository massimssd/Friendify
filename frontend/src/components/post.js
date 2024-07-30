import React, { useEffect, useState } from "react";
import axios from "axios";
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <header>
                        <img src="https://via.placeholder.com/40" alt="User Avatar" />
                        <h2>{post.username}</h2>
                    </header>
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                    {post.image && (
                        <div className="post-image">
                            <img src={post.image} alt="Post" />
                        </div>
                    )}
                    <footer>
                        <div className="icons">
                            <i className="fas fa-heart"></i>
                            <i className="fas fa-comment"></i>
                            <i className="fas fa-share"></i>
                        </div>
                        <div className="likes">100 likes</div>
                    </footer>
                </div>
            ))}
        </div>
    );
};

export default PostList;
