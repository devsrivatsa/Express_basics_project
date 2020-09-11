// Before using sequelize:

// const cartItems = require("../data/cart_items");
// const fs = require('fs');
// const path = require('path');
// const baseDir = require("../helper functions/path");

// const p = path.join(baseDir, "data", "cart.json");

// class Cart {
//     static addProduct(id, productPrice){
//         // fetch the previous contents from the cart
//         fs.readFile(p, (err, fileContent) => {
//             let cart = {products: [], totalPrice: 0};
//             if(!err) {
//                 cart = JSON.parse(fileContent);
//             }
//         });
//         // analyze the cart => Find the existing product
//         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//         const existingProduct = cart.products[existingProductIndex];
//         let updatedProduct;
//         if(existingProduct) {
//             updatedProduct = { ...existingProduct };
//             updatedProduct.qty = updatedProduct.qty + 1;
//         } else {
//             updatedProduct = { id: id, qty: 1};
//             cart.products = [...cart.products, updatedProduct];
//         }
//         cart.totalPrice += productPrice;
//         fs.writeFile(p,JSON.stringify(cart), (err) => {
//             console.log(err);
//         });
//     }
// }



// with sequelize

const Sequelize = require('sequelize');
const sequelize = require('../helper functions/database');

const Cart = sequelize.define('Cart', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;