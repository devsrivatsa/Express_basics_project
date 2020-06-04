var express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("In Home Page");
    res.send("<h1>In Home Page</h1>");
});

module.exports = router;