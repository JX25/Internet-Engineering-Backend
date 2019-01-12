const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};


exports.addAdmin = function(req, res){
    User.find({email: req.body.email})
        .exec()
        .then( user => {
            if (user.length >= 1){
                return res.status(409).json({
                    message: 'User exist'
                })
            } else {
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            name: req.body.email,
                            surname: req.body.surname,
                            email: req.body.email,
                            password: hash,
                            phone_number: req.body.phone,
                            is_admin: true,
                            created_date: Date.now(),
                            modified_date: Date.now()
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch( err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
};

exports.turnOffOnAccount = function (req, res){
    console.log(req);
    const id = req.params.userId;
    const val = (req.params.value == 'true');
    User.findOne({_id: id})
        .exec()
        .then( user =>{
            User.update({_id: id}, {active: val})
                .exec()
                .then(result =>{
                    res.status(200).json({
                        message:'Data update'
                    })
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({
                error: "Nie ma takiego uzytkownika"
            });
        });
}