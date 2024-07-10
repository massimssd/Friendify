const http = require('http');

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});

server.listen(port, () => {
    console.log(`Serveur démarré sur http://127.0.0.1:${port}/`);
});