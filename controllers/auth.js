const session = require('express-session');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[2]
    // .trim()
    // .split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Here',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    // setting a cookie
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    
    User.findById('5f8a1729ce339af98508bb69')
    .then(user => {
        // req.session.user = new User(user.username, user.email, user.cart, user._id);
        // next();
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log(req.session.user);
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        })
    })
    .catch(err => {
        console.log(err);
    });
    //storing session in memory
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        console.log('session destroyd');
        res.redirect('/');
    }); 
}