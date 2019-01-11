const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const ifAdmin = require('../middleware/if_admin');
//const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');
//test
router.get('/test', ticketController.test);
// wyswietlenie biletu
router.get('/ticket/:serial_number', checkAuth, ticketController.readTicket);
// historia kupionych biletow
router.get('ticket/:email', checkAuth, ticketController.userTickets);
// kupno biletu

// usuniecie biletu
router.delete('ticket/:id', checkAuth, ticketController.ticket_delete);
// kasowanie wszystkich biletow
router.delete('ticket/all', ifAdmin, ticketController.deleteAllTickets);
// update biletu
router.patch('ticket/update/:id', ifAdmin, ticketController.ticket_update);


module.exports = router;

