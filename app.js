var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

const db = require('./util/database');

// testing code for retriving items from db
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log(err);
// });

var app = express()
// set global config
app.set('view engine', 'ejs');
app.set('views', 'views');
// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));
//linking all our static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes)
app.use('',shopRoutes.routes);

app.use(errorsController.four_o_four);

app.listen(3000);
