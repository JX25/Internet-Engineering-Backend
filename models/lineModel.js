const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LineSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    city_start: {type: String, required: true},
    city_destination: {type: String, required: true},

    price: {type: Number, required: true},
    seats: {type: Number, required: true},
    travel_time: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Line', LineSchema);