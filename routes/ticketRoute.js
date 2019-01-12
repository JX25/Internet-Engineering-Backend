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
// zapłacenie za bilet
router.get('/pay/:serial_number', ticketController.payTicket);
// wyswietlenie biletu
router.get('/show/:serial_number', checkAuth, ticketController.readTicket);
// historia kupionych biletow
router.get('/mytickets', checkAuth, ticketController.allUserTickets);
// usuniecie biletu
router.delete('/remove/:ticketId', checkAuth, ticketController.ticket_delete);
// kasowanie wszystkich biletow
router.delete('/removeall', ifAdmin, ticketController.deleteAllTickets);
// update biletu
router.patch('/update/:id', ifAdmin, ticketController.ticket_update);

//sukces zapłaty
router.get('/success/:serial_number', ticketController.ticket_payment_success);
// porażka zapłaty
router.get('/failure/:serial_number', ticketController.ticket_payment_failure);



module.exports = router;

