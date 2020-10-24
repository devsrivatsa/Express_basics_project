var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); //uncommenting 
const authRoutes = require('./routes/auth');
const errorsController = require('./controllers/errors');

const mongoConnect = require('./helper functions/database').mongoConnect;
const User = require('./models/user');

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
    User.findById('5f8a1729ce339af98508bb69')
    .then(user => {
        req.user = new User(user.username, user.email, user.cart, user._id);
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes.routes)
app.use('',shopRoutes.routes);
app.use(authRoutes);
app.use(errorsController.four_o_four);


mongoConnect();
app.listen(3000);
