require("dotenv").config();
require("./controllers/authentication");

const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const mongoAcc = process.env.MONGO_ACC;
const mongoPwd = process.env.MONGO_PWD

const mongo_url = `mongodb+srv://${mongoAcc}:${mongoPwd}@cluster0.1eajp.mongodb.net/playerLogDb?retryWrites=true&w=majority`;

const auth = require("./routes/authRoutes")
const logRoutes = require("./routes/logRoutes");

mongoose.connect(
   mongo_url,
   {useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
   });

app.use("/", auth);

app.use("/", passport.authenticate("jwt", {session: false}), logRoutes);

app.use(function(err, req, res, next) {
   res.status(err.status||500);
   res.json({ error: err});
});

app.listen({port}, () => {
   console.log(`running on port ${port}.`);
});