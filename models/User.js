const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  isPlatform: {
    type: Boolean,
    default: false,
  },
  badges: {
    type: [],
    default: [],
  },
  avatarId: {
    type: Number,
    default: 0,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
