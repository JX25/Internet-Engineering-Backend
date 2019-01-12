const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');
const uuid = require('uuid');
const paypal = require('paypal-rest-sdk');
const path = require('path');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AX6j9r6NWwq1vNcwKrlkSigi42yQzQCcgqVLszZJ97qZPsLUTgRP0ScVz2bX1hrkf1kQnuFbuUYiKi-O', // please provide your client id here
    'client_secret': 'EKTtL0DApBvv17xLBEqsKYOsJffd_tPfoG5eTfokahPZYqwh0HtV9i_aLRor9i1_eFA3XwOWi5eFDR5O' // provide your client secret here
});


exports.test = function (req, res) {
    console.log("ok")
    res.send('Test controller is ok!');
};
//-------------------------------------------Ticket
exports.createTicket = function (req, res) {
    const ticket = new Ticket(
        {
            serial_number: uuid.v1(),
            line: req.body.line,
            price: req.body.price,
            //to do data dzien-miesiac-rok godzina-minuty
            purchase_date: (new Date()).toString(),
            travel_date: req.body.travel_date,
            //discount: req.body.discount,
            owner_email: req.body.owner_email,
        }
    );

    ticket.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(JSON.stringify(ticket));
    });
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

exports.allUserTickets = (req, res) => {
    console.log("allUserTickets");
    let email = req.body.email;
    console.log(email);
    //res.send('Test controller is ok!');
    Ticket.find({owner_email: email})
        .exec()
        .then( tickets =>{
            return res.status(200).send(
                JSON.stringify(tickets)
            )
        })
        .catch( err =>{
        return res.status(404).json({
            message: "No tickets!"
        })
    });
};


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

exports.ticket_delete = function (req, res, next) {
    Ticket.deleteOne({serial_number: req.params.ticketId}, function (err) {
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
};

exports.payTicket =  function (req, res) {
    console.log("paypall")
    const serial_number = req.params.serial_number;


    getPrice(serial_number).then(function (result) {
        var tmpPrice = result;
        var payment = {
            "intent": "authorize",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://127.0.0.1:3000/ticket/success/" + serial_number,
                "cancel_url": "http://127.0.0.1:3000/ticket/failure/" + serial_number
            },
            "transactions": [{
                "amount": {
                    "total": tmpPrice,
                    "currency": "PLN"
                },
                "description": " ticket "
            }]
        }
        createPay( payment )
            .then( ( transaction ) => {
                var id = transaction.id;
                var links = transaction.links;
                var counter = links.length;
                while( counter -- ) {
                    if ( links[counter].method == 'REDIRECT') {
                        // redirect to paypal where user approves the transaction
                        res.redirect( links[counter].href )
                        return console.log("redirect to paypal")
                    }
                }
            })
            .catch( ( err ) => {
                console.log( err );
                res.status(500).json({
                    message: "Problem with payment",
                    error: err
                })
            });

    })


};
// helper functions
var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
            if ( err ) {
                reject(err);
            }
            else {
                resolve(payment);
            }
        });
    });
}
var set_isPaid = function (serial_number) {
    const query  = { serial_number: serial_number };
    var newvalues = { $set: { is_paid: "true" } };
    Ticket.updateOne(query, newvalues, function (err, product) {
        if (err) return next(err);
        console.log('Ticker paid.');
    });

    return 0;
};


var getPrice = function (serial_number) {

    const query  = { serial_number: serial_number };
    return new Promise( ( resolve , reject ) => {
        Ticket.findOne(query).exec(function (err, result) {
            if(err) reject(err);
            else (resolve(result.price));
        })
    });

/*    Ticket.findOne(query).exec(function (err, result) {
        if(err) return next(err);
        //console.log("resultprice",result.price)
        return result.price;
    })*/

};
exports.ticket_payment_success = function (req, res) {
    const serial_number = req.params.serial_number;
    set_isPaid(serial_number);
    res.sendFile(path.join(__dirname+'/../public/success.html'));
};
exports.ticket_payment_failure = function (req, res) {
    res.sendFile(path.join(__dirname+'/../public/err.html'));
};

//http://localhost:3000/ticket/pay/fe747be0-16b1-11e9-b1b7-e1fa85fbf8fb
