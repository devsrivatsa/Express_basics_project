const Sequelize = require('sequelize');
const sequelize_db = require('../helper functions/database');

const User = sequelize_db.define('User', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;