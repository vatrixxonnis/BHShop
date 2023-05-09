const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema({
  order_id: { type: String },
  payment_date: { type: String },
  amount: { type: Number },
  payment_method: { type: String },
  status: { type: String },
  created_at: { type: Date ,default: Date.now()},
  updated_at: { type: Date ,default: Date.now()},
});
module.exports = mongoose.model("payment", payment, "Payment");
