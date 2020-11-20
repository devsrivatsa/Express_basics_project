const Product = require('../models/product');
const selected_items = [];
const ITEMS_PER_PAGE = 1;

exports.getProducts = (req, res, next) => {
    const pageNumber = Number(req.query.page) || 1;
    Product.fetchAll(pageNumber)
    .then(arr => {
        res.render('shop/product-list', 
        {
            prods: arr[1], 
            pageTitle: 'All Products', 
            path:'/product-list',
            isAuthenticated: req.session.isLoggedIn,
            pageDetails: {
                productCount: Number(arr[0]),
                currentPage: pageNumber,
                hasNextPage: Number(arr[0]) - pageNumber > 0,
                nextPage: pageNumber + 1,
                hasPreviousPage: pageNumber > 1,
                previousPage: pageNumber - 1,
                lastPage: Math.ceil(Number(arr[0])/ITEMS_PER_PAGE)
            }
        })
    })
    .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    Product.findById(product_id, req.user._id)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path:'/product/:_id',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        // console.log(err)
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });

}


exports.getIndex = (req, res, next) => {
    const pageNumber = Number(req.query.page) || 1;
    Product.fetchAll(pageNumber)
    .then(arr => {
        //pagination assist:
        // console.log((pageNumber - 1), (pageNumber > 1), pageNumber, (Number(arr[0]) - pageNumber > 0), (pageNumber + 1),Math.ceil(Number(arr[0])/ITEMS_PER_PAGE));
        res.render('shop/index', 
            {
                prods: arr[1],
                pageTitle: 'List of our Products', 
                path:'/',
                isAuthenticated: req.session.isLoggedIn,
                pageDetails: {
                    productCount: Number(arr[0]),
                    currentPage: pageNumber,
                    hasNextPage: Number(arr[0]) - pageNumber > 0,
                    nextPage: pageNumber + 1,
                    hasPreviousPage: pageNumber > 1,
                    previousPage: pageNumber - 1,
                    lastPage: Math.ceil(Number(arr[0])/ITEMS_PER_PAGE)
                }
            }
        )
    })
    .catch(err => {
        console.log(err);
        // const error = new Error(err);
        // error.httpSttusCode = 500;
        // next(error);
    });
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            cartItems: products,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });
}


exports.postCart = (req, res, next) => {
    prodId = req.body.product_id;
    Product.findById(prodId, req.user._id)
    .then(product => {
        return req.user.addToCart(product)
        .then(result => {
            console.log("Added product to cart");
            res.redirect('/cart');
        })
        .catch(err => {
            // console.log(err)
            const error = new Error(err);
            error.httpSttusCode = 500;
            next(error);
        });
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