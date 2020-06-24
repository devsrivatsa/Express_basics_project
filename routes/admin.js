var express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// get and post requests on the add-product page
router.get('/add-product', adminController.getAddProducts);
router.post('/add-product', adminController.postAddproducts);

// get admin-products page
router.get('/products', adminController.getProducts);

// get and post requests on the edit-product page
router.get('/edit-product', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

exports.routes = router;
