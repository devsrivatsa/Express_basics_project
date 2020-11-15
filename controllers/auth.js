const session = require('express-session');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

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
    // console.log(message);
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
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
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
        errorMessage: req.flash().length > 0 ? req.flash()[0] : null,
        oldInput: "",
        validationErrors: []
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //validation......................................................................................
    // collecting errors posted by check middleware
    const errors = validationResult(req);
    // if there are errors, the re-render the signup page again 
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg, // returns the array of results
            oldInput: {email:email, password:password, confirmPassword:confirmPassword},
            validationErrors: errors.array()
        });
    }
    //.................................................................................................

    // we are relying on the validator middleware for validating whether the email exists or not.
    // Hence we can start with bcrypting the password.
    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
        const user = new User(
            email, 
            hashedPassword, 
            {items: []}
        )
        return user.save()
    })
    .then(result => {
        res.redirect('/login');
        //send mail to new user
        transporter.sendMail({
            to: email,
            from: 'srivatsastudy@gmail.com',
            subject: 'LearnNodeJs SignUp Succeeded!!',
            html: '<h1>You have successfully signed up!</h1>'
        });
    })
    .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });
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


exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex'); //this token should get stored in the user model in the db
        const email = req.body.email_
        User.findByEmail(email)
        .then(user =>{
            if (!user) {
                req.flash('error', 'No account with that email found');
                return res.redirect('/');
            } else {
                // user.resetToken = token;
                // user.resetTokenExpiration = Date.now() + 3600000; // current time + 1 hr
                return User.updateResetTokenAndDate(user._id, token);
            }
        })
        .then(result => {
            // After the user token has been setImmediate, send email along with the reset link
            return transporter.sendMail({
                to: email,
                from: 'srivatsastudy@gmail.com',
                subject: 'Password Reset for LearnNodeJs',
                html: 
                `
                   <p>You have requested a password Reset</p>
                   <p>
                    Click this <a href="http://localhost:3000/new-password/${token}">link</a> to reset your password  
                `
            })
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            // console.log(err); 
            const error = new Error(err);
            error.httpSttusCode = 500;
            next(error);
        });

    });
}


exports.getNewPassword = (req, res, next) => {
    const resetToken =  req.params.token;
    User.findByResetToken(resetToken)
    .then(user => {
        console.log(user);
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }  
        res.render('auth/new-password', {
            pageTitle: 'Reset Password',
            path: '/new-password',
            userId: user._id.toString(),
            token: resetToken,
            errorMessage: message 
        });
    })
}

exports.postNewPassword = (req, res, next) => {
    const new_password = req.body.new_password;
    const id = req.body._id;
    const token = req.body.token;
    return bcrypt.hash(new_password, 12)
    .then(hashedNewPassword => {
        return User.updatePassword(token, hashedNewPassword);
    })
    .then(result => {
        console.log('Password has been updated');
        return res.redirect('/login');
    })
    .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    })

}