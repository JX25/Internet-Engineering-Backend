const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const ifAdmin = require('../middleware/if_admin');
//const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');
//test
router.get('/test', ticketController.test);
// kupno biletu
router.post('/buy', checkAuth, ticketController.createTicket);
// wyswietlenie biletu
router.get('/:serial_number', checkAuth, ticketController.readTicket);
// historia kupionych biletow
router.get('/mytickets', checkAuth, ticketController.allUserTickets);
// usuniecie biletu
router.delete('/:ticketId', checkAuth, ticketController.ticket_delete);
// kasowanie wszystkich biletow
router.delete('/remove/all', ifAdmin, ticketController.deleteAllTickets);
// update biletu
router.patch('/update/:id', ifAdmin, ticketController.ticket_update);


module.exports = router;

