const e = require("express");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  productImage: { type: String },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Courses", courseSchema);
