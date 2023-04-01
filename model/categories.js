const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = new Schema({
  _id: { type: String },
  category_id: { type: String },
  name: { type: Array },
  description: { type: String },
  parent_category_id: { type: String },
  image_url: { type: String },
});
module.exports = mongoose.model('categories', categories, 'Categories');