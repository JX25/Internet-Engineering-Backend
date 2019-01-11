const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};
//-------------------------------------------Ticket
exports.createTicket = function (req, res) {
    const ticket = new Ticket(
        {
            serial_number: req.body.serial_number,
            line: req.body.line,
            price: req.body.price,
            purchase_date: req.body.purchase_date,
            travel_date: req.body.travel_date,
            //discount: req.body.discount,
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

exports.readTicket = (req, res) => {
    const serial_number = req.params.serial_number;
    const query  = Ticket.where({ serial_number: serial_number });

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

exports.userTickets = (req, res) => {
    const email = req.params.email;
    Ticket.findMany({owner_login: email})
        .exec()
        .then( tickets =>{
            return res.status(200).send(
                JSON.stringify(tickets)
            )
        });
        .catch( err =>{
        return res.status(404).json({
            message: "No tickets!"
        })
    });
}

exports.allTickets = (req, res) => {
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

exports.deleteAllTickets = function (req, res) {
    Ticket.removeMany()
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "Tickets cleared"
            })
        })
        .catch(err =>{
            res.status(500).json({
                message: "Problem"
            })
        })
}