const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
  _id: { type: String },
  order_id: { type: String },
  user_id: { type: String },
  order_date: { type: String },
  order_status: { type: String },
  shipping_address: { type: Array },
  billing_address: { type: Array },
  payment_method: { type: String },
  payment_status: { type: String },
  total_amount: { type: Number },
  shipping_id: { type: String },
  discount_id: { type: String },
  voucher_id: { type: String },
  shipping_method: { type: String },
  shipping_cost: { type: Number },
  shipping_status: { type: String },
  tax_rate: { type: Number },
  notes: { type: String },
  is_gift: { type: Boolean },
  gift_message: { type: String },
});
module.exports = mongoose.model('order', order, 'Order');