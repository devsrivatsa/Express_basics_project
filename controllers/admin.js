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
    
    // 1. without sequelize
    // const product = new Product(title, imageUrl, description, price);
    // product.save()
    // // only redirect if successfully saved in db
    // .then(
    //     ()=>{res.redirect('/');
    // })
    // .catch(
    //     err => {console.log(err);
    // });

    // 2. with sequelize
//     Product.create({
//         title: title,
//         price: price,
//         imageUrl: imageUrl,
//         description: description,
//         userId: req.user.id
//     })
//     .then(result => {
//         console.log(result);
//         res.redirect("/admin/products");
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

    // 3. More elegant way to create a product and associate a user is - But not working
    req.user.createProduct({
                title: title,
                price: price,
                imageUrl: imageUrl,
                description: description
            })
            .then(result => {
            console.log(result);
            res.redirect("/admin/products");
        })
        .catch(err => {
            console.log(err);
        });
    }


//controller to view edit-product page
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // without having to get the product specific to user
    // Product.findByPk(prodId)

    /*getting products specifc to user. But this method returns an array instead of the product unlike findByPk.
    Therefore we want to get get the product from the products array */
    req.user.getProducts({where: {id: prodId}})
    .then(products => {
        const product = products[0];
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
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
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
        console.log(req.body);
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
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
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
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
    // 1. without sequelize
    
    // Product.fetchAll()
    // .then(([products, fieldData]) => {
    //     res.render('admin/products', {
    //         prods: products, 
    //         pageTitle: 'Admin Products', 
    //         path:'/admin/products'
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    // 2. with sequelize

    // getting all products without getting products for specific user.
    // Product.findAll()

    //getting all products for specific user
    req.user.getProducts()
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

