const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TicketSchema = new Schema({
    serial_number: {type: Number, required: true},
    line: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    purchase_date: {type: String, required: true},
    travel_date: {type: String, required: true},
    //discount: {type: Number, required: true},
    owner_email: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Ticket', TicketSchema);