const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/success' , (req ,res ) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname+'/../public/success.html'));
})

// error page
router.get('/err' , (req , res) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname+'/../public/err.html'));
})


module.exports = router;
