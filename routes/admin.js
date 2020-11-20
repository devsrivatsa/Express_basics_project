var express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

/*Adding the isAuth makes sure that the request to that route first pases through isAuth before passing through the actual controller. 
This is because the middlewares are executed from left-right.
We can add many middlewares like this. */

// get and post requests on the add-product page
router.get('/add-product', isAuth, adminController.getAddProducts);
router.post('/add-product', isAuth, adminController.postAddproducts);

// get admin-products page
router.get('/products', isAuth, adminController.getAdminProducts);

// get and post requests on the edit-product page
router.get('/edit-product/:product_id', isAuth, adminController.getEditProduct);
router.post('/edit-product', isAuth, adminController.postEditProduct);

// post route for deleting the item
// router.post('/delete-product', isAuth, adminController.postDeleteProduct);

//async delete (ajax)
router.delete('/product/:product_id', isAuth, adminController.DeleteProduct);
exports.routes = router;