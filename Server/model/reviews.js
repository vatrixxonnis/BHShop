const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviews = new Schema({
  _id: { type: ObjectId },
  product_id: { type: ObjectId },
  user_id: { type: String },
  rating: { type: Number },
  comment: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  reply: { type: Array ,default:[]},
  label: { type: String ,default:"accepted"},
});
module.exports = mongoose.model("reviews", reviews, "Reviews");
