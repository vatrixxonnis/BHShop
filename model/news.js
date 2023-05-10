const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
  _id: { type: ObjectId },
  email: { type: String },
  created_at: { type: Date , default: Date.now},
});
module.exports = mongoose.model('news', news, 'Newsletter');