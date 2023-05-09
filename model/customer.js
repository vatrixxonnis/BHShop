const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema({
user_id: { type: String },
addresses: { type: Array },
wishlist: { type: Array },
order_history: { type: Array },
cart: { type: Array },

});
module.exports = mongoose.model('customer', customer, 'Customer');