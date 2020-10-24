var express = require('express');
var bodyparser = require('body-parser');

// initializing session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const path = require('path');
const rootDirectory = require('./helper functions/path')


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); //uncommenting 
const authRoutes = require('./routes/auth');
const errorsController = require('./controllers/errors');

const mongoConnect = require('./helper functions/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://srivatsa:mongoDBpassword_123@learningnodejs.shpla.mongodb.net/learnNodeJs_DB?retryWrites=true&w=majority'

var app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// set views config
app.set('view engine', 'ejs');
app.set('views', 'views');
// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));
//linking all our static files
app.use(express.static(path.join(__dirname, 'public')));

// defining the session middleware
app.use(
    session({ 
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: store
    }));
 

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
