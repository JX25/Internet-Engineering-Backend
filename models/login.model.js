const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LoginSchema = new Schema({
    email: {type: String, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Login', LoginSchema);