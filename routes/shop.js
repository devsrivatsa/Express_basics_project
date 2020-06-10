const path = require('path');
var express = require('express');
const adminData = require('./admin');
const router = express.Router();


// router.get('/', (req, res, next) => {
//   // We just want to log all out products here
//   console.log(adminData.products);
//   res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
// });

// Since we have specified that all the pug files will be in the pug, it is sufficient to just put the name
// handlebars does not handle logic inside the template. Therefore we handle the logic here and send the result as a boolean
// The hasProducts is the boolean here
router.get('/', (req, res, next) =>{
  res.render('shop', {prods: adminData.products, pageTitle: 'Shop', path:'/'})
})

module.exports = router;