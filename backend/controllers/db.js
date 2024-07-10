const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'freindify_database',
    password: 'user',
    port: 5432,
});

module.exports = pool;
