var express = require('express');
var bodyparser = require('body-parser');

// initializing session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const path = require('path');
const rootDirectory = require('./helper functions/path')

//csrf
const csurf = require('csurf');

//flash error messages
const flash = require('connect-flash');

const multer = require('multer');
const hash = require('random-hash');

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

const csrfProtection = csurf()

// set views config
app.set('view engine', 'ejs');
app.set('views', 'views');
// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));
//linking all our static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware to extract image
const fileStorage = multer.diskStorage({
    // destination: (req, file, callback) => { //this is storing the file in the images folder
    //     callback(null, 'Images');
    destination: (req, file, callback) => { //this is storing the file in the images folder
        callback(null, path.join(__dirname, '/Images'));
    },

    filename: (req, file, callback) => { //this is just setting a unique filename
        let temp = file.originalname.split('.');
        const filename = temp[0] + '-' + hash.generateHash({length: 5}) + '.' + temp[1]
        callback(null, filename);
    }
})
// function to filter file types
const fileFilter = (req, file, callback) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

//'single' indicates that we will only receive a single image input
//'image' because the name of the input field that receives image input is 'image'
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
// defining the session middleware
app.use(
    session({ 
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: store
    }));
 
app.use(csrfProtection); // only generates the csrf token

app.use(flash()); // flash error messages.

// setting the  csrf token through locals variable:
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

//attaching the dummy user to the request
// app.use((req, res, next) => {
//     User.findById('5f8a1729ce339af98508bb69')
//     .then(user => {
//         req.user = new User(user.username, user.email, user.cart, user._id);
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });

/* the req.session.user is only storing the data in the database and not the User object 
oppsed to how the req.user can store the user object itself. Therefore, when we retrive the req.sesion.user object, 
we will not have access to the methods of the User class. So, we create a middleware 
that retrives the req.session.user._id and stores the User object in the req.user */
app.use((req, res, next) => {
    if (!req.session.user) { // if user is not logged in, do not execute this middleware
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = new User(user.email, user.password, user.cart, user._id);
        next();
    })
    .catch(err => {
        // console.log(err);
        next(new Error(err));
    });
});



app.use('/admin', adminRoutes.routes)
app.use('',shopRoutes.routes);
app.use(authRoutes);
app.use(errorsController.four_o_four);

app.use((error, req, res, next) => {
    console.log(error);
    res.redirect('/500');
});


mongoConnect();
app.listen(3000);
