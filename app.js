var express = require('express');
var bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

var app = express()

// body parser must come before all the other middleware
app.use(bodyparser.urlencoded({extended: false}));

// filtering the path with the /admin
app.use('/admin', adminRoutes); //without the function call t0 adminRoutes but again order matters
app.use(shopRoute);

// to send a 404 error we use res.status
app.use((req, res, next)=>{
    res.status(404).send('<h1>Page Not Found Man</h1>')
});


app.listen(3000);
