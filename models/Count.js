const mongoose = require("mongoose");

const countSchema = mongoose.Schema({
  visitCount: Number,
});

module.exports = mongoose.model("Count", countSchema, "Count");
