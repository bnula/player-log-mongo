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

const {Campaign, Character, Npc, Army, Location, Quest} = require("./models/models");
const {putRequest, patchRequest, deleteOneRequest, getAllRequest, getOneRequest, postRequest} = require("./controllers/requests");

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

app.route("/characters")
   .get(async (req, res) => {
      getAllRequest(req, res, Character);
   })
   .post(async (req, res) => {
      postRequest(req, res, Character);
   });

app.route("/characters/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Character);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Character);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Character)
   })
   .put(async (req, res) => {
      putRequest(req, res, Character);
   });

app.route("/npcs")
   .get(async (req, res) => {
      getAllRequest(req, res, Npc);
   })
   .post(async (req, res) => {
      postRequest(req, res, Npc);
   });

app.route("/npcs/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Npc);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Npc);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Npc)
   })
   .put(async (req, res) => {
      putRequest(req, res, Npc);
   });

app.route("/locations")
   .get(async (req, res) => {
      getAllRequest(req, res, Location);
   })
   .post(async (req, res) => {
      postRequest(req, res, Location);
   });

app.route("/locations/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Location);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Location);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Location)
   })
   .put(async (req, res) => {
      putRequest(req, res, Location);
   });

app.route("/armies")
   .get(async (req, res) => {
      getAllRequest(req, res, Army);
   })
   .post(async (req, res) => {
      postRequest(req, res, Army);
   });

app.route("/armies/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Army);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Army);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Army)
   })
   .put(async (req, res) => {
      putRequest(req, res, Army);
   });

app.route("/quests")
   .get(async (req, res) => {
      getAllRequest(req, res, Quest);
   })
   .post(async (req, res) => {
      postRequest(req, res, Quest);
   });

app.route("/quests/:id")
   .get(async (req, res) => {
      getOneRequest(req, res, Quest);
   })
   .delete(async (req, res) => {
      deleteOneRequest(req, res, Quest);
   })
   .patch(async (req, res) => {
      patchRequest(req, res, Quest)
   })
   .put(async (req, res) => {
      putRequest(req, res, Quest);
   });

app.listen({port}, () => {
   console.log(`running on port ${port}.`);
});