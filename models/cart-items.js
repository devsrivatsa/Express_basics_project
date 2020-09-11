
const Sequelize = require('sequelize');
const sequelize = require('../helper functions/database');

const CartItem = sequelize.define('CartItem', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = CartItem;