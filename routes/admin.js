const path = require('path');
const rootDirectory = require('../helper functions/path');
var express = require('express');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product' })
});

// this is a post request and it is getting whatever we filled out in app-products.html page
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
});

// module.exports = router;
// A different syntax for exporting
exports.routes = router;
exports.products = products;