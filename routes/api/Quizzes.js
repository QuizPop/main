const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateQuizCreationInput = require("../../validation/QuizCreation");
const validateQuizEditInput = require("../../validation/QuizEdit");
const validateQuizTakingInput = require("../../validation/QuizTaking");

const Quiz = require("../../models/Quiz");

router.post("/quiz-creation", (req, res) => {

    const {errors, isValid } = validateQuizCreationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Quiz.findOne({name : req.body.name}).then(quiz => {
        if(quiz) {
            return res.status(400).json( {name: "Name already exists"});
        } else {
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
        }
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
    
})

module.exports = router;