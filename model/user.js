const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    user_id: {type: String},
    user_type: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String},
    password: {type: String},
    salt: {type: String},
    email: {type: String},
    gender: {type: String},
    phone_number: {type: String},
    birth_date: {type: String},
    created_at: {type: String, default: Date.now()},
    updated_at: {type: String, default: Date.now()},
    status: {type: String},
  },
  { versionKey: false }
);
module.exports = mongoose.model("user", user, "User");
