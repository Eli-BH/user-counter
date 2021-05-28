const mongoose = require("mongoose");

const countSchema = mongoose.Schema({
  ip: String,
});

module.exports = mongoose.model("Count", countSchema, "Count");
