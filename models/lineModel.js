const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LineSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    city_start: {type: String, required: true},
    city_destination: {type: String, required: true},
    departures : {type:[String], required: true, default: ["10:00","12:00","18:00"]},
    price: {type: Number, required: true},
    seats: {type: Number, required: true},
    travel_time: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Line', LineSchema);