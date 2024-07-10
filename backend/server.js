// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./controllers/db');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(bodyParser.json());

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur Friendify!');
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://127.0.0.1:${PORT}/`);
});
