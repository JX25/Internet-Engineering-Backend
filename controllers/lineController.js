const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};

exports.createLine = function(req, res, next){
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

exports.updateLine = (req, res, next) => {
    Line.findByIdAndUpdate({_id: req.params.lineId}, {$set: req.body}, function (err, line) {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(line);
        res.send('Line updated.');
    });
};

exports.deleteLine = (req, res, next) => {
    Line.findByIdAndRemove(req.params.lineId, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
}

exports.allLines = (req, res, next) => {
    Line.find()
        .exec()
        .then(lines =>{
            res.status(200).send(
                JSON.stringify(lines)
            )
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.showLine = (req, res) => {
    const id = req.params.lineId;
    const query = Line.where({_id: id});

    query.findOne(function (err, line) {
        if (err) return res.status(404).send();
        if (line) {
            return res.status(200).send({line});
        }
        return res.status(404).send();
    }).catch((e) => {
        return res.status(400).send(e);
    });
}

exports.deleteAll =  (req, res) => {
    Line.removeMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Tickets cleared"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Problem"
            })
        });
};

exports.findRoute = (req, res, next) => {
  const start = req.params.start.charAt(0).toUpperCase()+req.params.start.slice(1);
  const stop = req.params.stop.charAt(0).toUpperCase()+req.params.stop.slice(1);;

  Line.find({city_start: start, city_destination: stop})
      .exec()
      .then( lines =>{
          res.status(200).json({
              lines
          })
      })
      .catch(err =>{
          res.status(404).json({
              message: "There is no line between those two cities"
          })
      })
};