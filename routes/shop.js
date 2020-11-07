var express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');


// urls to controller function mapping
router.get('/', shopController.getIndex);
router.get('/products-list', shopController.getProducts);
router.get('/product/:product_id', shopController.getProduct);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postDeleteProductCart);
router.post('/orders', isAuth, shopController.postOrders);
// router.get('/orders', isAuth, shopController.getOrders);
// router.get('/checkout', isAuth, shopController.getCheckout);



exports.routes = router;