const Line = require('../models/line.model');
const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const {ObjectID} = require('mongodb');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};
//-------------------------------------------Ticket
exports.ticket_create = function (req, res) {
    let ticket = new Ticket(
        {
            serial_number: req.body.serial_number,
            line: req.body.line,
            price: req.body.price,
            purchase_date: req.body.purchase_date,
            travel_date: req.body.travel_date,
            discount: req.body.discount,
            owner_login: req.body.owner_login,
        }
    );

    ticket.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Ticket Created successfully')
    })
};

exports.ticket_read = (req, res) => {
    let serial_number = req.params.serial_number;
    let query  = Ticket.where({ serial_number: serial_number });

    query.findOne(function (err, ticket) {
        if (err) return res.status(404).send();
        if (ticket) {
            return res.status(200).send({ticket});
        }
        return res.status(404).send();
    }).catch((e) => {
        return res.status(400).send(e);
    });

};

exports.ticket_readAll = (req, res) => {
    Ticket.find().then((tickets) => {
        res.send({tickets});
    }, (e) => {
        return res.status(404).send(e);
    });

};

exports.ticket_update = function (req, res) {
    Ticket.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
};

exports.ticket_delete = function (req, res) {
    Ticket.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
//-------------------------------------------Line

//-------------------------------------------User