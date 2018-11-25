const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*GET register page
router.get('/register', function(req, res, next) {
    res.render('register_form', { title: 'Express' });
});*/

module.exports = router;
