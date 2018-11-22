const express = require('express');
const router = express.Router();

const crud_controller = require('../controllers/crud.controller');

router.get('/test', crud_controller.test);
//Tickets
router.post('/ticket/create', crud_controller.ticket_create); //CREATE
router.get('/ticket/read/:serial_number', crud_controller.ticket_read);//READ
router.get('/ticket/readall', crud_controller.ticket_readAll);//READ ALL
router.put('/ticket/update/:id', crud_controller.ticket_update);//UPDATE
router.delete('/ticket/delete/:id', crud_controller.ticket_delete);//DELETE

module.exports = router;