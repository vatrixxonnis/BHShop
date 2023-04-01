const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  _id: { type: String },
  product_id: { type: String },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image_url: { type: String },
  category_id: { type: String },
  country_of_origin: { type: String },
  brand: { type: String },
  weight: { type: String },
  nutrition_facts: { type: Object },
  ingredients: { type: Array },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('product', product,'Product');