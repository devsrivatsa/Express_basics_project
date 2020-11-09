// with mongo db
const mongodb = require('mongodb');
const getDb = require('../helper functions/database').getDb;

class Product {
  constructor(title, price, description, imageurl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageurl = imageurl;
    this._id = id ? new mongodb.ObjectId(id) : null; //fixing the add product functionality
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id) {
      //update the product
      dbOp = db.collection('products')
      .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})
    } else {
      //add new product
      dbOp = db.collection('products')
      .insertOne(this);
    }

    return dbOp
    .then(result => console.log("Item saved!"))
    .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
  }

  static findById(prodId, userId) {
    const db = getDb();
    return db
    .collection('products')
    .find({_id: new mongodb.ObjectID(prodId), userId: new mongodb.ObjectId(userId)})
    .next()
    .then(product => {
      return product;
    })
    .catch(err => console.log(err));
  }

  static fetchProductForUser(userId) {
    const db = getDb();
    return db
    .collection('products')
    .find({userId: new mongodb.ObjectId(userId)})
    .toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
  }

  static deleteById(prodId, userId) {
    const db = getDb();
    return db
    .collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId), userId: new mongodb.ObjectId(userId)})
    .then(result => {
      console.log(`item with ID: ${mongodb.ObjectId(prodId)} has been deleted.`);
    })
    .catch(err => console.log(err));
  }

}
module.exports = Product;