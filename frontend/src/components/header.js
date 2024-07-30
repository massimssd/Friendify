import React from 'react';
import Navbar from './navbar';
import './Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
    return (
        <header className="header">
            <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
        </header>
    );
};

export default Header;
