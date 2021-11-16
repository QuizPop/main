const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateQuizCreationInput = require("../../validation/QuizCreation");
//const validateQuizEditInput = require("../../validation/QuizEdit");
//const validateQuizTakingInput = require("../../validation/QuizTaking");

const Quiz = require("../../models/Quiz");

router.post("/quiz-create", (req, res) => {

    Quiz.findOne({name : req.body.name}).then(quiz => {

            const newQuiz = new Quiz({
                name: req.body.name,
                description: req.body.description,
                platform_ID: req.body.platform_ID,
                time_limit: req.body.time_limit,
                questions: req.body.questions
            });
            newQuiz
            .save()
            .then(quiz => res.json(quiz))
            .catch(err => console.log(err));
        });
});

router.post("/quiz-edit" , (req, res) => {
    
    const {errors, isValid } = validateQuizEditInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Quiz.updateOne(
       { __id: req.body.__id },
       {
           $set: {name: req.body.name,
            description: req.body.description,
            time_limit: req.body.time_limit,
            questions: req.body.questions}
       }
    )
    
});

router.post("/quiz-list", (req, res) => {
    Quiz.find();
})

module.exports = router;