const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const User = require("../models/user");
const itemValidation = require("../validation/item");
const bcrypt = require("bcryptjs");


// @route   GET item/all
// @desc    Get all items
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Item.find()
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   POST item/create
// @desc    Create item 
// @access  Public
router.post("/create", (req, res) =>{
    const {errors, isValid} = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
      const item = new Item({
        username: req.body.username,
        content: req.body.content
    });

User.findOne({ username: req.body.username }).then(user => {
console.log(user);
console.log(user.password);

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {

        item.save()
        .then(()=> {
            res.json(item);
        })
        .catch(err => res.status(404).json(err));

      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ message: "Password Incorrect" }));

  }).catch(err => res.status(404).json({ noUser: "There are no users with this username" }));
  
});

// @route   Delete item/deleteItem
// @desc    Delete item 
// @access  Public
router.delete("/deleteItem", (req, res) => {

  let errors = {};

  const password = req.body.password;
  const username = req.body.username;

   User.findOne({ username: req.body.username }).then(user => {
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {

        Item.deleteOne({'username': req.body.username})
    .then(({ok, n}) => {
        res.json({ noItems: "Item deleted" });
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));

      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ message: "Password Incorrect" }));

  }).catch(err => res.status(404).json({ noUser: "There are no users with this username" }));

});


// @route   PUT item/updateItem
// @desc    Update item 
// @access  Public
router.put("/updateItem", (req, res) => {

  const {errors, isValid} = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
  let errorlog = {};

  const password = req.body.password;
  const  username = req.body.username;
  const content = req.body.content;

     User.findOne({ username: req.body.username }).then(user => {
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        Item.replaceOne({'username': user.username},
    {'username': user.username, 'content': req.body.content})
    .then(({ok, n}) => {
        res.json({ noItems: "item updated" });
    })
    .catch(err => res.status(404).json(err));

      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ message: "Password Incorrect" }));

  }).catch(err => res.status(404).json({ noUser: "There are no users with this username" }));

});

module.exports = router;
