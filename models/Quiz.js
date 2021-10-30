const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  platform_ID: {
      type: String,
      required: true
  },
  time_limit: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  questions:
    [{questiontext: String, answerOptions: [{answerText: String, isCorrect: Boolean}]}]
});
module.exports = User = mongoose.model("Quizzes", QuizSchema);
