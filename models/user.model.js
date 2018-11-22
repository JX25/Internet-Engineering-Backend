const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: Number, required: true, max: 9},
    login: {type: String, required: true, max: 10},
    password: {type: String, required: true}, //jakieś haszowanie?
});


// Export the model
module.exports = mongoose.model('User', UserSchema);