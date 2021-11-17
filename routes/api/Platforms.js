const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// const validateQuizCreationInput = require("../../validation/QuizCreation");
//const validateQuizEditInput = require("../../validation/QuizEdit");
//const validateQuizTakingInput = require("../../validation/QuizTaking");

const Platform = require("../../models/Platform");

router.post("/platform-create", (req, res) => {

    Platform.findOne({name : req.body.name}).then(quiz => {

            const platform = new Platform({
                name: req.body.name,
                owner_ID: req.body.owner_ID,
                description: req.body.description,
                tags: req.body.tags
                        });
            platform
            .save()
            .then(quiz => res.json(quiz))
            .catch(err => console.log(err));
        });
});

router.post("/", (req, res) => {

    return Platform.find((error, data) => {
        if(error){
            return next (error);
        } else {
            return res.json(data);
        }
   });
});

router.route("/").get((req, res)=> {
    return Platform.find((error, data) => {
        if(error){
            return next (error);
        } else {
            return res.json(data);
        }
   });
});



module.exports = router;