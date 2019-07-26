const Validator = require("validator");
const isEmpty = require("../is-empty");
 module.exports = function validateLoginInput(user) {
let errors = {};
 // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
user.username = !isEmpty(user.username) ? user.username : "";
user.password = !isEmpty(user.password) ? user.password : "";
user.password2 = !isEmpty(user.password2) ? user.password2 : "";
user.email = !isEmpty(user.email) ? user.email : "";

 //Username validation rules
if (!Validator.isAlphanumeric(user.username)) {
errors.username = "Username is invalid";
}

if (Validator.isEmpty(user.username)) {
errors.username = "Username field is required";
}

//Password validation rules
if (Validator.isEmpty(user.password)) {
errors.password = "password field is required";
}

if (Validator.isEmpty(user.password2)) {
errors.password = "password field is required";
}

if (!Validator.equals(user.password, user.password2)) {
errors.password = "password fields do not match";
}

//Email validation rules
if (Validator.isEmpty(user.email)) {
errors.email = "email field is required";
}

if (!Validator.isEmail(user.email)) {
errors.email = "email is invalid";
}

 return {
errors, 
isValid: isEmpty(errors)
}
};