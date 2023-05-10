const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({
  _id: { type: ObjectId },
  user_id: { type: String, required: true },
  addresses: { type: Array , default: []},
  wishlist: { type: Array , default: []},
  order_history: { type: Array , default: []},
  cart: { type: Array , default: []},
});
module.exports = mongoose.model("customer", customer, "Customer");
