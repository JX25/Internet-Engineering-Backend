const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const checkAuth = require('../middleware/check_auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
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
                            account_type: 0,
                            created_date: Date.now(),
                            modified_date: Date.now()
                        });
                        user
                            .save()
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
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .lean()
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
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
                            userId: user[0]._id
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
});

router.patch('/update/:userId', checkAuth, (req, res, next) =>{
    const id = req.params.userId;
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
});

router.delete('/:userId', (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
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
});


module.exports = router;
