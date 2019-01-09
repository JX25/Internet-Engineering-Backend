const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const ifAdmin = require('../middleware/if_admin');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/all', ifAdmin, userController.getUsers);
router.delete('/all', ifAdmin, userController.deleteUsers);

router.get('/test', userController.test);
router.post('/register', userController.setUser);
router.post("/login", userController.loginUser);
router.patch('/update/:userId', checkAuth, userController.updateUser);
router.delete('/:userId', checkAuth, userController.deleteUser);




module.exports = router;
