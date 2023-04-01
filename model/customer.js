const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema({
  _id: { type: String },
  customer_id: { type: String },
  gender: { type: Array },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  addresses: { type: Array },
  birth_date: { type: String },
});
module.exports = mongoose.model('customer', customer, 'Customer');