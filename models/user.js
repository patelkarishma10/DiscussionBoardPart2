const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;