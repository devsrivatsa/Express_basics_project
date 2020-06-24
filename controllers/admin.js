// using an array instead of a file
const product_array = require('../data/product_array');

// controller to view add-product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product' })
}
// controller to send post request on add-product page
exports.postAddproducts = (req, res, next) => {
    const title = req.body.title
    const imageURL = req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    product_array.push([title, imageURL, price, description]);
    res.redirect('/');
}
//controller to view edit-product page
exports.getEditProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Edit Products :)', path: '/admin/edit-product'});
}
//controller to send post request on edit-product page
exports.postEditProduct = (req, res, next) => {
   res.redirect('/');
} 

//controller to view products page in admin
exports.getProducts = (req, res, next) => {
    res.render('admin/products', 
    {
        prods: product_array, 
        pageTitle: 'Admn Products', 
        path:'/admin/products'
    });
}

