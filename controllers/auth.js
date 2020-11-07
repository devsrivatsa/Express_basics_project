const session = require('express-session');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


const User = require('../models/user');

//This is just the syntax for sendgrid. Every smtp service will have its wn syntax.
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
        api_key: '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'
        }   
    })
);

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[2]
    // .trim()
    // .split('=')[1];

    // the req.flash('error') seems to be an empty array if there is no error. We want it to be null.
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Here',
        errorMessage: message 
    });
}

exports.postLogin = (req, res, next) => {
    // setting a cookie
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email)
    .then(user => {
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(match => {
            if (match) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect("/");
                })     
            }
            req.flash('error', 'Invalid Email or password');
            return res.redirect("/login")
        })
    })
    .catch(err => {
        console.log(err);
    });

} 

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        console.log('session destroyd');
        res.redirect('/');
    }); 
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: req.flash().length > 0 ? req.flash()[0] : null
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findByEmail(email)
    .then(userDoc => {
        if (userDoc) {
            req.flash('error', 'Email already exists. Please pick a different one.')
            return res.redirect('/signup')
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User(
                email, 
                hashedPassword, 
                {items: []}
            )
            return user.save()
        })
    })
    .then(result => {
        res.redirect('/login');
        //send mail to new user
        transporter.sendMail({
            to: email,
            from: 'srivatsastudy@gmail.com',
            subject: 'LearnNodeJs SignUp Succeeded!!',
            html: '<h1>You have successfully signed up!</h1>'
        })
        .catch(err => {
            console.log(err);
        })
        
    })
    .catch(err => {
        console.log(err);
    })
}


exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }  
    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/reset',
        errorMessage: message 
    });
}