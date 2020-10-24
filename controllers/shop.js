const Product = require('../models/product');
const selected_items = [];


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', 
        {
            prods: products, 
            pageTitle: 'All Products', 
            path:'/product-list',
            isAuthenticated: req.isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    Product.findById(product_id)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path:'/product/:_id',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err)
    });

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/index', 
        {
            prods: products, 
            pageTitle: 'List of our Products', 
            path:'/',
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            cartItems: products,
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => console.log(err));
}


exports.postCart = (req, res, next) => {
    prodId = req.body.product_id;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product)
        .then(result => {
            console.log("Added product to cart");
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
    });
}

exports.postDeleteProductCart = (req, res, next) => {
    const prodId = req.body.product_id;
    req.user
    .deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
    
}


// exports.getOrders = (req, res, next) => {
//     res.render('shop/orders', 
//     {
//         pageTitle: 'My Orders',
//         path: '/orders'
//     });
// }


// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', 
//     {
//         pageTitle: 'Checkout Page',
//         path: '/checkout'
//     });
// }