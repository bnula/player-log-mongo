require("dotenv").config();

const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
   res.send("hello there");
});

app.use("/", auth);

app.use("/", logRoutes);

app.listen({port}, () => {
   console.log(`running on port ${port}.`);
});