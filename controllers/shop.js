const product_array = require('../data/product_array');


// The fetch all function does not return anything. Only the callback inside the function returns the array
exports.getProducts = (req, res, next) => {
    res.render('shop/product-list', 
    {
        prods: product_array, 
        pageTitle: 'All Products', 
        path:'/products'
    });
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    console.log(prodId);
}

exports.getIndex = (req, res, next) => {
    res.render('shop/index', 
    {
        prods: product_array, 
        pageTitle: 'List of our Products', 
        path:'/'
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart',
    {
        path: '/cart',
        pageTitle: 'your cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {
        pageTitle: 'Checkout page',
        path: '/checkout'
    });
}