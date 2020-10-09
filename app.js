var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')

// commenting out the routes to avoid error for time being
const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
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

// commenting out the routes to avoid error for time being
app.use('/admin', adminRoutes.routes)
// app.use('',shopRoutes.routes);

app.use(errorsController.four_o_four);


//since we are not returning the client anymore
// mongoClient(client => {
//     console.log(client);
//     app.listen(3000);
// });

mongoConnect();
app.listen(3000);
