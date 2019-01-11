const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {
                type: String,
                required: true,
                unique: true,
                match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                index: true
    },
    password: {type: String, required: true},
    phone_number: {type: Number, required: true, max: 999999999, min: 100000000},
    created_date: {type: Date, required: true},
    modified_date: {type: Date, required: true},
    is_admin: {type: Boolean, required: true, default: false},
    active: {type: Boolean, required: true, default: true}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);