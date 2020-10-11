var express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// get and post requests on the add-product page
router.get('/add-product', adminController.getAddProducts);
router.post('/add-product', adminController.postAddproducts);

// get admin-products page
router.get('/products', adminController.getAdminProducts);

// get and post requests on the edit-product page
router.get('/edit-product/:product_id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

// post route for deleting the item
// router.post('/delete-product', adminController.postDeleteProduct);

exports.routes = router;