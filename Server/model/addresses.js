const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addresses = new Schema({
  _id: { type: String },
  name: { type: String },
  codename: { type: String },
  division_type: { type: String },
  phone_code: { type: String },
  districts: { type: Array },
});
module.exports = mongoose.model('addresses', addresses, 'Addresses');