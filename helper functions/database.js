//1. without sequalize

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejscomplete',
//     password: '1234'
// });

// module.exports = pool.promise();




//2. with sequalize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejscomplete','root','1234', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
