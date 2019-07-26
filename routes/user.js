const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userValidation = require("../validation/user");
const bcrypt = require("bcryptjs");



// @route   POST user/register
// @desc    Create account
// @access  Public
router.post("/register", (req, res) =>{
    const {errors, isValid} = userValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

   User.find({$or: [{ username: req.body.username}, {email : req.body.email }]}).then(founduser => {
 if (founduser.length != 0) {
     res.json({message: "username or email is not unique"})
 } else {
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
         //if (err) throw err;
         user.password = hash; 
         user.save()
        .then(()=> {
            res.json(user);
        })
        .catch(err => res.status(404).json(err));
      });
   });
 }
    }).catch(err => res.status(404).json(err));

});

// @route   GET user/login
// @desc    Login
// @access  Public
router.get("/login", (req, res) => {
  let errorlog = {};

  const password = req.body.password;
  const username = req.body.username;

  User.findOne({ username: req.body.username }).then(user => {
 bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
console.log(user);
        res.json("success")
      } else {
        errorlog.password = "Password Incorrect";
        return res.status(400).json(errorlog);
      }
    })
    .catch(err => res.status(404).json(err));
    }).catch(err => res.status(404).json(err));

});



module.exports = router;