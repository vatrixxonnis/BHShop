const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = new Schema({
  name: { type: Array },
  description: { type: String },
  image_url: { type: String },
});
module.exports = mongoose.model('categories', categories, 'Categories');