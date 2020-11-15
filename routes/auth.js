const express = require('express');
const authController = require('../controllers/auth');
const { check, body } = require('express-validator/check'); // body is included because we are looking for specific fields in body
const User = require('../models/user');


const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post(
        '/signup',
        [
            check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, {req}) => {
                return User.findByEmail(value)
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email Already Exists. Please pick a different one.');
                    }
                });
            }),

            //checking if password is >= min length and if it is alphanumeric; and if the enail is already present
            body('password', 'Please enter a password with only numbers and text, and which is at least 5 characters long')
            .isLength({min: 5})
            .isAlphanumeric(),

            //checking if the confirmPassword matches password
            body('confirmPassword')
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match!');
                }
                return true;
            })
            
        ], authController.postSignup
    );

    //we can add our own validation with .custom((valuee,{req}) => {}) method.
    // we can customize the validator by refring the validator.js doc [upon which the express validator is a wrapper]
    // We can add more validators in this array
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/new-password/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;