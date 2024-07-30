import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Instagram Clone. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
