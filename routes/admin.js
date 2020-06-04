var express = require('express');
const router = express.Router();


router.get('/admin/add-product', (req, res, next) => {
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title"></input><button type="submit">send</button></form>');
});

router.post('/admin/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;