const express = require("express");
const router = express.Router();


//const valdiatePlatformCreationInput = require("../../validation/PlatformCreation");
//const validatePlatformEditInput = require("../../validation/PlatformEdit");

const Platform = require("../../models/Platform");

router.post("/platform-create", (req, res) => {
Platform.findOne({name : req.body.name}).then(platform => {

    const newPlatform = new Platform({
        name: req.body.name,
        owner_ID: req.body.owner_ID,
        description: req.body.description,
        tags: req.body.tags
    });

    newPlatform
    .save()
    .catch(err => console.log(err));
});
});
module.exports = router;

           