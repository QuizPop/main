const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//const valdiatePlatformCreationInput = require("../../validation/PlatformCreation");
//const validatePlatformEditInput = require("../../validation/PlatformEdit");

const Platform = require("../../models/Platform");

router.post("/platform-create", (req, res) => {

    Quiz.findOne({name : req.body.name}).then(quiz => {
            const newQuiz = new Quiz({
                name: req.body.name,
                owner_ID: req.body.owner_ID,
                description: req.body.description,
                tags: req.body.tags
            });
            newQuiz
            .save()
            .then(quiz => res.json(quiz))
            .catch(err => console.log(err));
        });
});