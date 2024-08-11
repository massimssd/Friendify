// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/login';
import Signup from './pages/signup';
import AddPost from './pages/addPost';
import PostList from './components/post';
import './index.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
                    {isAuthenticated && <Route path="/addpost" element={<AddPost />} />}
                    <Route path="/" element={<PostList />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
