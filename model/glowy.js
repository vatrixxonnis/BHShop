const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const glowy = new Schema({
  title: { type: String },
  content: { type: String },
  link: { type: String },
});
module.exports = mongoose.model("glowy", glowy, "Glowy");
