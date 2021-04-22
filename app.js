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

const {User, Campaign, Character, Npc, Army, Location} = require("./models");
const {putRequest, patchRequest, deleteOneRequest, getAllRequest, getOneRequest, postRequest} = require("./requests");

mongoose.connect(
   mongo_url,
   {useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
   });

app.get("/", (req, res) => {
   res.send("hello there");
});

app.route("/campaigns")
   .get(async (req, res) => {
      getAllRequest(req, res, Campaign);
   })
   .post(async (req, res) => {
      postRequest(req, res, Campaign);
   });

app.route("/campaigns/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Campaign);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Campaign);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Campaign);
   })
   .put(async (req, res) => {
      putRequest(req, res, Campaign);
   });

app.listen({port}, () => {
   console.log(`running on port ${port}.`);
});