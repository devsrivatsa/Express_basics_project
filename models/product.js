

//1. Without sequelize

// const path = require('path');
// const db = require('../helper functions/database');


// class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // the db.execute executes the sql command and returns a promise. The values are specified as array to avoid sql injection.
//     return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUE (?, ?, ?, ?)',
//     [this.title, this.price, this.imageUrl, this.description]);
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
// };


//2. with Sequelize

const Sequelize = require('sequelize');
const sequelize_db = require('../helper functions/database'); 

const Product = sequelize_db.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;