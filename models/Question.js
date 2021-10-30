const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  hint: String,
  answerOptions: [{answerText: String, isCorrect: Boolean}],
  quiz_ID: {
      type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("Questions", QuestionSchema);
