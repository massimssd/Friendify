const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./routes/allrouter');
const app = express();

app.use(bodyParser.json()); // Ajoutez cette ligne pour analyser les requêtes JSON

app.use('/', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://127.0.0.1:${PORT}/`);
});
