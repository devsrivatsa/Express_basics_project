const mongodb = require('mongodb')
const Product = require('../models/product');

// controller to view add-product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product', editing: false, isAuthenticated: req.isLoggedIn })
}
// controller to send post request on add-product page
exports.postAddproducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user._id;
    // for mongodb, we create a product obj
    const product = new Product(title, price, description, imageUrl, null, userId)
    product.save()
    .then(result => {
        console.log('created product!!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}


//// controller to view edit-product page
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.product_id;
    console.log(editMode);
    Product.findById(prodId)
           .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            return res.render('admin/edit-product', {
                pageTitle: 'Edit-Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });

}

//// controller to send post request on edit-product page
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.product_id;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findById(prodId)
    .then(productData => {
        const product = new Product(
            updatedTitle, 
            updatedPrice, 
            updatedDescription, 
            updatedImageUrl, 
            new mongodb.ObjectId(prodId)
            )
        return product.save();
    })
    .then(result => {
        console.log('Updated Product!!!!!');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });   
} 

//controller to delete products page in admin products page
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.product_id;    
    Product.deleteById(prodId)
    .then(result => {
        console.log("Product destroyed!!!!");
        res.redirect("/admin/products");
    })
    .catch(err => {
        console.log(err);
    });

}


//controller to view products page in admin
exports.getAdminProducts = (req, res, next) => {
    //getting all products for specific user
    // req.user.getProducts() //this will not work
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path:'/admin/products',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
}

