const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletter = new Schema({
  email: { type: String },
  created_at: { type: Date , default: Date.now},
});
module.exports = mongoose.model('newsletter', newsletter, 'Newsletter');