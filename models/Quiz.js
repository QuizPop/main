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
      required: false
  },
  owner_ID: {
    type: String,
    required: false
  },
  time_limit: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  questions:
    [{questionText: String, 
      hint: String, 
      answerOption1: String, 
      answerOption2: String, 
      answerOption3: String, 
      answerOption4: String,
      answerIndex: Number,
      answerOptions: Array
    }],
    required: false
  });
module.exports = User = mongoose.model("Quizzes", QuizSchema);
