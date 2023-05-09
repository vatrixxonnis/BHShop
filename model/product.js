const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose").Types;

const product = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    inventory_qty: { type: Number },
    image_url: { type: Array },
    category_id: { type: String },
    country_of_origin: { type: String },
    brand: { type: String },
    weight: { type: String },
    nutrition_facts: { type: Object },
    campaign: { type: Object },
    ingredients: { type: Array },
    storage_instructions: { type: String },
    image: { type: Array },
    created_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
module.exports = mongoose.model("product", product, "Product");
