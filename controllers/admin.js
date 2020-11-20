const mongodb = require('mongodb')
const Product = require('../models/product');

// controller to view add-product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', 
    {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn 
    })
}
// controller to send post request on add-product page
exports.postAddproducts = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user._id;
    if(!image) {
        return res.render('admin/edit-product',
        {
            pageTitle: 'Add-Product',
            path: 'admin/edit-product',
            editing: true,
            product: {
                title: title,
                price: price,
                description: description
            },
            errorMessage: 'Attached file is not valid'
        });
    }
    // for mongodb, we create a product obj
    const product = new Product(title, price, description, image, false, userId)
    product.save()
    .then(result => {
        console.log('created product!!');
        res.redirect('/admin/products');
    })
    .catch(err => {
        // console.log(err)
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });
}


//// controller to view edit-product page
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.product_id;
    const userId = req.user._id;
    Product.findById(prodId, userId)
           .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            return res.render('admin/edit-product', {
                pageTitle: 'Edit-Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product,
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

//// controller to send post request on edit-product page
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.product_id;
    const userId = req.user._id;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findById(prodId, userId)
    .then(productData => {
        const product = new Product(
            updatedTitle, 
            updatedPrice, 
            updatedDescription, 
            updatedImageUrl, 
            new mongodb.ObjectId(prodId),
            new mongodb.ObjectId(userId)
            )
        return product.save();
    })
    .then(result => {
        console.log('Updated Product!!!!!');
        res.redirect('/admin/products');
    })
    .catch(err => {
        // console.log(err);
        const error = new Error(err);
        error.httpSttusCode = 500;
        next(error);
    });   
} 

// controller to delete products page in admin products page
// exports.postDeleteProduct = (req, res, next) => {    
//     Product.deleteById(req.body.product_id, req.user._id)
//     .then(result => {
//         console.log("Product destroyed!!!!");
//         res.redirect("/admin/products");
//     })
//     .catch(err => {
//         // console.log(err);
//         const error = new Error(err);
//         error.httpSttusCode = 500;
//         next(error);
//     });

// }

// async delete controller
exports.DeleteProduct = (req, res, next) => {
    //delete requests are not allowed to have req.body so we use req.params to get the product_id    
    Product.deleteById(req.params.product_id, req.user._id)
    .then(result => {
        console.log("Product destroyed!!!!");
        res.status(200).json()
    })
    .catch(err => {
        res.status(500).json();
        console.log(err);
    });

}


//controller to view user products page in admin
exports.getAdminProducts = (req, res, next) => {

    Product.fetchProductForUser(req.user._id)
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path:'/admin/products',
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

