var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); //uncommenting 
const errorsController = require('./controllers/errors');

const mongoConnect = require('./helper functions/database').mongoConnect;

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
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    next();
});

app.use('/admin', adminRoutes.routes)
app.use('',shopRoutes.routes); //uncommenting 

app.use(errorsController.four_o_four);


mongoConnect();
app.listen(3000);
