const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("Platforms", PlatformSchema);
