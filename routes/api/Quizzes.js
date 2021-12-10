const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateQuizCreationInput = require("../../validation/quizCreation");
//const validateQuizEditInput = require("../../validation/QuizEdit");
//const validateQuizTakingInput = require("../../validation/QuizTaking");

const Quiz = require("../../models/Quiz");

router.post("/quiz-create", (req, res) => {
  Quiz.findOne({ name: req.body.name }).then((quiz) => {
    const newQuiz = new Quiz({
      name: req.body.name,
      description: req.body.description,
      platform_ID: req.body.platform_ID,
      time_limit: req.body.time_limit,
      questions: req.body.questions,
      owner_ID: req.body.ownerId,
    });
    newQuiz
      .save()
      .then((quiz) => res.json(quiz))
      .catch((err) => console.log(err));
  });
});

router.patch("/:id", (req, res) => {
  // const { errors, isValid } = validateQuizEditInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  Quiz.findOneAndUpdate(
    { __id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        time_limit: req.body.time_limit,
        questions: req.body.questions,
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  return Quiz.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

router.post("/quiz-list", (req, res) => {
  Quiz.find();
});

router.post("/", (req, res) => {
  return Quiz.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

router.route("/").get((req, res) => {
  return Quiz.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  return Quiz.findById(id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});
module.exports = router;
