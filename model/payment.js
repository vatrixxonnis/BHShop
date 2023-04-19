const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payment = new Schema({
  payment_method_id: { type: String },
  payment_method_name: { type: String },
  card_type: { type: String },
  description: { type: String },
  is_active: { type: Boolean },

});
module.exports = mongoose.model('payment', payment, 'Payment');