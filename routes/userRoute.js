const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const userController = require('../controllers/userController');

router.get('/test', userController.test);
// rejestracja uzytkownika
router.post('/register', userController.setUser);
// logowanie uzytkownika
router.post("/login", userController.loginUser);
// aktualizacja danych uzytkownika
router.patch('/update/:userId', checkAuth, userController.updateUser);
// usuwanie konta uzytkownika
router.delete('/:userId', checkAuth, userController.deleteUser);
// reset hasla uzytkownika




module.exports = router;
