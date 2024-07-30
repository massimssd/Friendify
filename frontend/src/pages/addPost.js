import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";
function AddPost() {
    const [formData, setFormData] = useState({
        content: "",
        image: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');  // Récupération du token depuis localStorage
            const response = await axios.post("http://localhost:4000/posts", formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Ajout du token d'authentification
                }
            });
            console.log("Post added:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Error adding post:", error.response ? error.response.data : error.message);
        }
    };

    const isFormValid = () => {
        return formData.content && formData.image;
    };

    return (
        <div className="form-container">
            <h2>Add Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={!isFormValid()}>Add Post</button>
            </form>
        </div>
    );
}

export default AddPost;
