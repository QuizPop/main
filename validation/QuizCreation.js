const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateQuizInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    //todo: check for duplicate names in platform

    // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
};