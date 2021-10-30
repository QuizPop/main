const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//const valdiatePlatformCreationInput = require("../../validation/PlatformCreation");
//const validatePlatformEditInput = require("../../validation/PlatformEdit");

const Platform = require("../../models/Platform");