// with mongo db

const getDb = require('../helper functions/database').getDb;

class Product {
  constructor(title, price, description, imageurl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageurl = imageurl;
  }

  save() {
    const db = getDb();
    // method 1
    // db.collection('products').insertOne({title:"something", price: "", description:"", imageurl:""})

    //method 2
    return db.collection('products')
    .insertOne(this)
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }
}
module.exports = Product;