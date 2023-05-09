const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviews = new Schema({
  product_id: { type: String },
  user_id: { type: String },
  rating: { type: Number },
  comment: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  reply: { type: Array },
  label: { type: Boolean },
});
module.exports = mongoose.model("reviews", reviews, "Reviews");
