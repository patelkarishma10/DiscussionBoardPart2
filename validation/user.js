const Validator = require("validator");
const isEmpty = require("../is-empty");
 module.exports = function validateLoginInput(item) {
let errors = {};
 // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
item.username = !isEmpty(item.username) ? item.username : "";
item.password = !isEmpty(item.password) ? item.password : "";
item.email = !isEmpty(item.email) ? item.email : "";

 //Username validation rules
if (!Validator.isAlphanumeric(item.username)) {
errors.username = "Username is invalid";
}

if (Validator.isEmpty(item.username)) {
errors.username = "Username field is required";
}

//Password validation rules
if (Validator.isEmpty(item.password)) {
errors.password = "password field is required";
}

//Email validation rules
if (Validator.isEmpty(item.email)) {
errors.email = "email field is required";
}

if (!Validator.isEmail(item.email)) {
errors.email = "email is invalid";
}

 return {
errors, 
isValid: isEmpty(errors)
}
};