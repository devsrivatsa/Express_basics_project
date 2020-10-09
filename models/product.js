// with mongo db

class Product {
  constructor(title, price, description, imageurl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageurl = imageurl;
  }

  save() {
    //we will do this later
  }
}
module.exports = Product;