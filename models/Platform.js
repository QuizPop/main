const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PlatformSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  owner_ID: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false

  },
  tags: {
    type: String,
    required: false

  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("Platforms", PlatformSchema);
