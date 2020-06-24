const mysql = require('mysql2');
const pool = msql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejscomplete',
    password: '1234'
});

module.exports = pool.promise();