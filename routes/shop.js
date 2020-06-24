var express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:product_id', shopController.getProduct)
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);



exports.routes = router;