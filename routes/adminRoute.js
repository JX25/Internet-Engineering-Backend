const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const ifAdmin = require('../middleware/if_admin');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

// info o wszystkich uzytkownikach
router.get('/all', ifAdmin, userController.getUsers);
// usuwanie wszystkich uzytkownikow
router.delete('/all', ifAdmin, userController.deleteUsers);
// dodawanie administratora
router.post('/addadmin', ifAdmin, adminController.addAdmin)
// usuniecie konta / wylaczenie
router.patch('/addadmin', ifAdmin, adminController.turnOffAccount)





module.exports = router;
