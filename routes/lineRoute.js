const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const adminAuth = require('../middleware/if_admin');
const lineController = require('../controllers/lineController');

//test
router.get('/test', lineController.test);

// dodanie linii
router.post('/addline', adminAuth, lineController.createLine);
// modyfikacja linii
router.patch('/update/:lineId', adminAuth, lineController.updateLine);
// usuniecie linii
router.delete('/remove/:lineId', adminAuth, lineController.deleteLine);
// wyswietlenie linii
router.get('/show/:lineId', lineController.showLine);
//wyswietlenie wszystkich linii
router.get('/lines', checkAuth, lineController.allLines);
// usuwanie wszystkich linii
router.delete('/remove/all', adminAuth, lineController.deleteAll);
// wyszukanie polaczenia

module.exports = router;
