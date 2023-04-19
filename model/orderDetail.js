const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetail = new Schema({
  item_id: { type: String },
  order_id: { type: String },
  product_id: { type: String },
  product_price: { type: Number },
  product_quantity: { type: Number },
  subtotal: { type: Number },
  discount_amount: { type: Number },
  tax_amount: { type: Number },
  total_amount: { type: Number },
  product_rating: { type: Array },
});
module.exports = mongoose.model("orderDetail", orderDetail, "OrderDetail");
