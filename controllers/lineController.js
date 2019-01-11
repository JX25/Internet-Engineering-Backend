const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};

exports.createLine = function(req, res){
    const line = new Line({
        name: req.body.name,
        code: req.body.code,
        city_start:     req.body.start,
        city_destination:   req.body.stop,
        price:  req.body.price,
        seats:  req.body.seats,
        travel_time:    req.body.time,
    });

    line.save(function (err){
        if(err){
            return next(err);
        }
        res.send('Line has been created');
    })
};

exports.updateLine = (req, res) => {
    Line.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, line) {
        if (err) return next(err);
        res.send('Product updated.');
    });
};

exports.deleteLine = (req, res) => {
    Line.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })

exports.showLines = (req, res) => {
    Line.find()
        .exec()
        .then( lines =>{
            return res.status(200).send(
                JSON.stringify(lines)
            )
        });
        .catch( err =>{
        return res.status(404).json({
            message: "No tickets!"
        })
    });
}

exports.showLine = (req, res) => {
    const code = req.params.code;
    const query  = Ticket.where({ code: code });

    query.findOne(function (err, line) {
        if (err) return res.status(404).send();
        if (line) {
            return res.status(200).send({line});
        }
        return res.status(404).send();
    }).catch((e) => {
        return res.status(400).send(e);
    });

exports.deleteAll = function (req, res) {
    Line.removeMany()
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