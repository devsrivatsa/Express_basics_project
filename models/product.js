const fs = require('fs');
const path = require('path');


// We dont need this anymore
// const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString()
    // Here, this refers to this item/product/object that we want to store in the array
    // products.push(this);
    // This is where we want to save our data
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    // before saving, we first want to read the file to see if there is data already present inside
    // if not, then we create a new file first
    fs.readFile(p, 'utf8', (err, fileContent) => {
      let products = [];
      if (err) {
        console.log(err);
      } else {
        products = JSON.parse(fileContent);
        products.push(this);
        // store it in the savePath; If there is an error, then handle error.
        fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
        });
      }
    });
  }

  static fetchAll(cb_fn) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err) {
        // since this function should return a array, if there is no content then we return an empty array
        cb_fn([]);
      }
      // the fileContent from the file is a text. Therefore to return it as an array, we call parse
      cb_fn(JSON.parse(fileContent));
    });
  }

  static findById(id, cb_fn) {
    const p = path.join()
  }
};
