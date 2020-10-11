// using an array instead of a file
const Product = require('../models/product');

// controller to view add-product page
exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product', editing: false })
}
// controller to send post request on add-product page
exports.postAddproducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    
    // for mongodb, we create a product obj
    const product = new Product(title, price, description, imageUrl)
    product.save()
    .then(result => {
        console.log('created product!!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

    // 3. More elegant way to create a product and associate a user is - But not working
    // req.user.createProduct({
    //             title: title,
    //             price: price,
    //             imageUrl: imageUrl,
    //             description: description
    //         })
    //         .then(result => {
    //         console.log(result);
    //         res.redirect("/admin/products");
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}


//// controller to view edit-product page
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.product_id;
    console.log(editMode);
    // if (editMode !== 'true') {
    //     return res.redirect('/');
    // }
    
    // without having to get the product specific to user
    // Product.findByPk(prodId)

    /*getting products specifc to user. But this method returns an array instead of the product unlike findByPk.
    Therefore we want to get get the product from the products array */
    // req.user.getProducts({where: {id: prodId}}) //since this wont work currently in mongodb implementation
    Product.findById(prodId)
    // .then(product => {
        // const product = products[0]; //the returned item is not an array anymore
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            return res.render('admin/edit-product', {
                pageTitle: 'Edit-Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product
        });
    })
    .catch(err => {
        console.log(err);
    });

}

//controller to send post request on edit-product page
// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedPrice = req.body.price;
//     const updatedDescription = req.body.description;
//     Product.findByPk(prodId)
//     .then(product => {
//         console.log(req.body);
//         product.title = updatedTitle;
//         product.price = updatedPrice;
//         product.imageUrl = updatedImageUrl;
//         product.description = updatedDescription;
//         return product.save();
//     })
//     .then(result => {
//         console.log('Updated Product!!!!!');
//         res.redirect('/admin/products');
//     })
//     .catch(err => {
//         console.log(err);
//     });   
// } 

// //controller to delete products page in admin products page
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findByPk(prodId)
//     .then(product => {
//         return product.destroy();
//     })
//     .then(result => {
//         console.log("Product destroyed!!!!");
//         res.redirect("/admin/products");
//     })
//     .catch(err => {
//         console.log(err);
//     });

// }


//controller to view products page in admin
exports.getAdminProducts = (req, res, next) => {
    //getting all products for specific user
    // req.user.getProducts() //this will not work
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path:'/admin/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
}

