const Product = require('../models/product');
// const Cart = require('../models/cart');
const selected_items = [];


exports.getProducts = (req, res, next) => {

    // this is the same implementation as that of sequelize but instead of findAll, we change the name to fetchAll 
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', 
        {
            prods: products, 
            pageTitle: 'All Products', 
            path:'/product-list'
        })
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const product_id = req.params.product_id;
    // 1. without sequelize
    
    // Product.findById(product_id)
    // .then(([item, fieldData]) => {
    //     console.log(item);
    //     res.render('shop/product-detail', {
    //         product: item[0],
    //         pageTitle: item[0].title,
    //         path:'/product/:product_id'
    //     });
    // })
    // .catch(err => {
    //     console.log(err)
    // });

    // 2. with sequelize
    // Product.findAll({where: {id: prodId }})
    // .then(products => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path:'/product/:product_id'
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    // 2. this is the same implementation as that of sequelize to return a single product
    Product.findById(product_id)
    .then(product => {
        // console.log(product);
        // console.log('product found!');
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path:'/product/:_id'
        });
    })
    .catch(err => {
        console.log(err)
    });

}

exports.getIndex = (req, res, next) => {
    // 1. without sequelize

    // Product.fetchAll()
    // .then(([product, fieldData]) => {
    //     res.render('shop/index', 
    //     {
    //         prods: product, 
    //         pageTitle: 'List of our Products', 
    //         path:'/'
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    //same impleentation as that of sequelize. method name changed to fetchAll instead of findAll
    Product.fetchAll()
    .then(products => {
        res.render('shop/index', 
        {
            prods: products, 
            pageTitle: 'List of our Products', 
            path:'/'
        })
    })
    .catch(err => {
        console.log(err);
    });
}

// exports.getCart = (req, res, next) => {
    // res.render('shop/cart',
    // {
    //     path: '/cart',
    //     pageTitle: 'Your Cart',
    //     selectedItems: selected_items
    // });
//     req.user.getCart()
//     .then(cart => {
//         return cart.getProducts()
//         .then(products => {
//             console.log(products[0].CartItem);
//             res.render('shop/cart', {
//                 path: '/cart',
//                 pageTitle: 'Your Cart',
//                 products: products
//             });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));

// }

// exports.postCart = (req, res, next) => {
//     prodId = req.body.productId;
//     let fetchedcart;
//     let newQuantity;
    //method 1 - with sequelize
    
    // Product.findByPk(id)
    // .then((item, fieldData) => {
    //     selected_items.push(item[0][0]);
    //     Cart.addProduct(item[0][0].id, item[0][0].price);
    //     console.log(cart);
    //     res.redirect('/cart');
    // })
    // .catch(
    //     err => {
    //         console.log(err);
    //     });

    //method 2 -  using the req.user object

//     req.user.getCart()
//     .then(cart => {
//         fetchedcart = cart;
//         return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         let product;
//         if(products.length > 0) {
//             product = products[0];
//         }
//         if (product) {
//             let oldQuantity = product.quantity;
//             if(!oldQuantity){
//                 oldQuantity = 1;
//             }
//             newQuantity = oldQuantity + 1;
//             return product;
//         }
//         return Product.findByPk(prodId)
//         .then(product => {
//             return fetchedcart.addProduct(product, {through: {quantity: newQuantity}});
//         })
//     })
//     .then(() => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }


// exports.postDeleteProductCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getCart()
//     .then(cart => {
//         return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         const product = products[0];
//         return product.CartItem.destroy();
//     })
//     .then(result => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

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