const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    user_id: { type: String },
    user_type: { type: String },
    username: { type: String },
    email: { type: String },
    gender: { type: String },
    password: { type: String },
    salt: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    address: { type: String },
    phone_number: { type: String },
    payment_method_id: { type: String },
    cart_id: { type: String },
    birth_date: { type: String },
    status: { type: String },
  },
  { versionKey: false }
);
module.exports = mongoose.model("user", user, "User");
