const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TicketSchema = new Schema({
    serial_number: {type: String, required: true},
    line: {type: String, required: true},
    price: {type: Number, required: true},
    purchase_date: {type: String, required: true},
    travel_date: {type: String, required: true},
    //discount: {type: Number, required: true},
    owner_email: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Ticket', TicketSchema);