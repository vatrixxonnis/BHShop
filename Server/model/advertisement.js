const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertisement = new Schema({
  title: { type: String },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  link: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  priority: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});
module.exports = mongoose.model(
  "advertisement",
  advertisement,
  "Advertisement"
);
