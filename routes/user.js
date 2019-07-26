const express = require("express");
const router = express.Router();
const User = require("../models/user");
//const itemValidation = require("../validation/user");
//const bcrypt = require("bcryptjs");



// @route   POST user/register
// @desc    Create account
// @access  Public
router.post("/register", (req, res) =>{
    // const {errors, isValid} = itemValidation(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

        const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    user.save()
        .then(()=> {
             res.json(user);
             console.log('complete')
        })
        .catch(err => res.status(404).json(err));
   
//    bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(item.email, salt, (err, hash) => {
//          if (err) throw err;
//          item.email = hash; 
//          item.save()
//         .then(()=> {
//             res.json(item);
//         })
//         .catch(err => res.status(404).json(err));
//       });
//    });

});

module.exports = router;