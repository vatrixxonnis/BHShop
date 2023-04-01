const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addresses = new Schema({
  _id: { type: String },
  address_id: { type: String },
  district: { type: Array },
  province: { type: String },
});
module.exports = mongoose.model('addresses', addresses, 'Addresses');