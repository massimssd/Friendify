const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../controllers/db');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error while fetching all users:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

const signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const newUser = await User.createUser(username, email, password);
        const token = generateToken(newUser.id);
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error('Error while signing up:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        console.error('Error while logging in:', error.message);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};


module.exports = {
    getAllUsers,
    signup,
    login,
};
