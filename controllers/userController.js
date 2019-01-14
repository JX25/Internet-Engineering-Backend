const User = require('../models/userModel');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const email = require('emailjs');



exports.test = function (req, res) {
        res.send('Test controller is ok!');
};

exports.createUser = function(req, res){
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
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            password: hash,
                            phone_number: req.body.phone,
                            account_type: 0,
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

exports.loginUser = function(req, res){
    User.find({ email: req.body.email })
        .lean()
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (user.active == false) {
                return res.status(401).json({
                    message: "Account has been disabled"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            pass: user[0].password
                        },
                        //zmienna srodowiskowa
                        "secret",
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getUsers = function (req, res) {
    User.find({is_admin: false})
        .exec()
        .then(users =>{
            res.status(200).send(
                JSON.stringify(users)
            )
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.updateUser = function (req, res){
    const id = req.userData.userId;
    console.log(id);
    const updateOps = {};
    for( var ops in req.body){
        updateOps[ops] = req.body[ops];
    }
    updateOps['modified_date'] = Date.now();
    User.update({_id: id},{$set: updateOps})
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
};

exports.deleteUser = function (req, res){
    User.deleteOne({_id: req.userData.userId})
        .exec()
        .then( result => {
            res.status(200).json({
                message: result
            });
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


    exports.deleteUsers = function (req, res){
        User.deleteMany({is_admin: false})
            .exec()
            .then( result =>{
                res.status(200).json({
                    message: result
                });
            })
            .catch( err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }


    exports.resetPassword = function (req, res) {
        const newPassword = uuid.v4();
        console.log(newPassword);
        bcrypt.hash(newPassword, 12, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                User.updateOne({"email": req.userData.email},{$set: {"password": hash}})
                    .exec()
                    .then( result =>{
                        console.log(hash);
                        console.log(result);
                        console.log("pass changed");
                    })
                    .catch(err =>{
                        res.status(500).json({
                            message: "server problem"
                        })
                    })
            }
        });

        var server 	= email.server.connect({
            user:    "igkowalski@fastmail.com",
            port: 465,
            password:"gepvpv7b3qxkhddk",
            host:    "smtp.fastmail.com",
            ssl:     true
        });

        server.send({
            text:    "Your new password: "+newPassword,
            from:    "you <igkowalski@fastmail.com>",
            to:      "someone <"+req.userData.email+">",
            //cc:      "else <else@your-email.com>",
            subject: "Password reset"
        }, function(err, message) { console.log(err || message); });

        res.status(200).json({
            message: "Check your email"
        })
    };