const mongodb = require('mongodb');
const getDb = require('../helper functions/database').getDb;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email= email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users')
        .insertOne(this)
        .then(result => {
            console.log('User Added !')
        })
        .catch(err => console.log(err))
    }

    static findById(userId) {
        const db = getDb();
        return db
        .collection('users')
        .findOne({_id : new mongodb.ObjectId(userId)})
        .then(user => {
            return user;
        })
        .catch(err => console.log(err));
    }

    addToCart(product) {
        if (!this.cart.items) {
            this.cart.items = new Array()
        }
        const cartProductIndex = this.cart.items.findIndex(cp => {
          return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
    
        if (cartProductIndex >= 0) {
          newQuantity = this.cart.items[cartProductIndex].quantity + 1;
          updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
          updatedCartItems.push({
            productId: new mongodb.ObjectId(product._id),
            quantity: newQuantity
          });
        }
        const updatedCart = {
          items: updatedCartItems
        };
        const db = getDb();
        return db
          .collection('users')
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: updatedCart } }
          );
    }


    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => { 
            return i.productId
        });
        return db
        .collection('products')
        .find({_id: {$in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(cartItem => {
                        return cartItem.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        })
        .catch(err => console.log(err));
    }
 
    deleteItemFromCart(prodId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== prodId.toString();
          });      
        const db = getDb();
        return db
        .collection('users')
        .updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        );
    }

    addOrder() {
        const db = getDB();
        return db.collection('orders')
        .insertOne(this.cart)
        .then(result => {
            this.cart = {items: []};
            return db
            .colection('users')
            .updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {'$set': {cart: {items: []}}}
            );
        })
        .catch(err =>  console.log(err));
    }


}

module.exports = User;