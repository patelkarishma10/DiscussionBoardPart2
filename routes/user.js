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

   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
         if (err) throw err;
         user.password = hash; 
         user.save()
        .then(()=> {
            res.json(user);
        })
        .catch(err => res.status(404).json(err));
      });
   });

});



module.exports = router;