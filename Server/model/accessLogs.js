const mongoose = require("mongoose");

const accessLogsSchema = new mongoose.Schema({
  IP: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  city: {
    type: String,
  },
  userAgent: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const accessLogs = mongoose.model(
  "accessLogsSchema",
  accessLogsSchema,
  "AccessLogs"
);

module.exports = accessLogs;
