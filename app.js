var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

// we import the database object to sync and define reltions
const sequelize_db = require('./helper functions/database');

// We import the individual schemas to define relationship
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-items');

// const db = require('./util/database');

// testing code for retriving items from db
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log(err);
// });

var app = express();
// set global config
app.set('view engine', 'ejs');
app.set('views', 'views');
// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));
//linking all our static files
app.use(express.static(path.join(__dirname, 'public')));

//attaching the dummy user to the request
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes.routes)
app.use('',shopRoutes.routes);

app.use(errorsController.four_o_four);

// creating relations in the database - now every user will have products. If a user is deleted, his/her products are deleted.
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});


// syncing all data to the database; force - for dev environment only.
sequelize_db
// .sync({force: true})
.sync()
.then(result => {
    // app.listen(3000);
    User.findByPk(1);
})
.then(user => {
    if(!user) {
        return User.create({name:'Max', email: 'test@test.com'});
    }
    return user;
})
.then(user => {
    // console.log("USER =>",user);
    return user.createCart();
    // app.listen(3000);
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});

