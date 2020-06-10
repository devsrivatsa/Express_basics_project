var express = require('express');
const expressHbs = require('express-handlebars')
var bodyparser = require('body-parser');
const path = require('path');
const rootDirectory = require('./helper functions/path')

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');


var app = express()
// set global config
app.set('view engine', 'ejs');
app.set('views', 'views');

// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));

//linking all our static files
app.use(express.static(path.join(__dirname, 'public')));

// filtering the path with the /admin
//without the function call t0 adminRoutes but again order matters
// app.use('/admin', adminRoutes); 
app.use('/admin', adminData.routes)
app.use(shopRoute);

// to send a 404 error we use res.status
// app.use((req, res, next)=>{
//     //This is one oway of doing it
//     // res.status(404).sendFile(path.join(__dirname, 'views', 'page_not_found.html'));
//     res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
// });

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: ':('});
});

app.listen(3000);
