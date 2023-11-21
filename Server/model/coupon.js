const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voucher = new Schema({
  code: { type: String },
  discount_type: { type: String },
  discount_value: { type: Number },
  valid_from: { type: Date },
  valid_to: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("voucher", voucher, "Voucher");
