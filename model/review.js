const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("../model/product"); // Import model Product
const User = require("../model/user"); // Import model User
const review = new Schema({
  user_id: { type: String, ref: "user" },
  product_id: { type: Schema.Types.ObjectId, ref: "product" },
  rating: { type: Number },
  comment: { type: String },
  created_at: { type: Date },
  created_at: { type: Date },
  label: { type: String },
});

module.exports = mongoose.model("review", review, "Reviews");
