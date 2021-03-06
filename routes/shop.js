var express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

// urls to controller function mapping
router.get('/', shopController.getIndex);
router.get('/products-list', shopController.getProducts);
router.get('/product/:product_id', shopController.getProduct)
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);



exports.routes = router;