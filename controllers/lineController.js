const Line = require('../models/lineModel');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {ObjectID} = require('mongodb');

exports.test = function (req, res) {
    res.send('Test controller is ok!');
};