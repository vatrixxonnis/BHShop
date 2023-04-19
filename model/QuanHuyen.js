const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuanHuyen = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: false },
  type: { type: String, required: true },
  slug: { type: String, required: true },
  name_with_type: { type: String, required: true },
  path: { type: String, required: true },
  path_with_type: { type: String, required: true },
  code: { type: String, required: true },
  parent_code: { type: String, required: true },
  children: { type: Array, required: false},
});
module.exports = mongoose.model('QuanHuyen', QuanHuyen, 'QuanHuyen');