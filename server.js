const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const user = require("./routes/user");
const item = require("./routes/item");


let uri = 'mongodb://mongo:27017/discussionBoard';
let opts = { useNewUrlParser: true };

mongoose.connect(uri, opts).then(
    () => { console.log("connected to mongo") },
    (err) => {console.log(err)}
);


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/user", user);
app.use("/item", item);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
