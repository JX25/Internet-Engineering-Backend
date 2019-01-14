const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const userController = require('../controllers/userController');

router.get('/test', userController.test);
// rejestracja uzytkownika
router.post('/register', userController.createUser);
// logowanie uzytkownika
router.post("/login", userController.loginUser);
// aktualizacja danych uzytkownika
router.patch('/updateAccount', checkAuth, userController.updateUser);
// usuwanie konta uzytkownika
router.delete('/deleteAccount', checkAuth, userController.deleteUser);
// reset hasla uzytkownika
router.patch('/resetPass', checkAuth, userController.resetPassword);




module.exports = router;
