const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  name: { type: String },
  stock_status: { type: String },
  description: { type: String },
  campaign: { type: Object },
  price: { type: Number },
  inventory_qty: { type: Number },
  image: { type: Array },
  category_lst: { type: Array },
  country_of_origin: { type: String },
  brand: { type: String },
  weight: { type: String },
  nutrition_facts: { type: Object },
  ingredients: { type: Array },
  storage_instructions: { type: String },
  created_date: { type: Date, default: Date.now },

}, { versionKey: false });
module.exports = mongoose.model('product', product, 'Product');