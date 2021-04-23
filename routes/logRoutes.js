const express = require("express");
const router = express.Router();
const {putRequest, patchRequest, deleteOneRequest, getAllRequest, getOneRequest, postRequest} = require("../controllers/requests");
const {Campaign, Character, Npc, Army, Location, Quest} = require("../models/models");

// campaigns
router
   .get("/campaigns", async (req, res) => {
      getAllRequest(req, res, Campaign);
   })
   .post("/campaigns", async (req, res) => {
      postRequest(req, res, Campaign);
   })
   .get("/campaigns/:id", async (req, res) => {
      getOneRequest(req, res, Campaign);
   })
   .delete("/campaigns/:id", async (req, res) => {
      deleteOneRequest(req, res, Campaign);
   })
   .patch("/campaigns/:id", async (req, res) => {
      patchRequest(req, res, Campaign);
   })
   .put("/campaigns/:id", async (req, res) => {
      putRequest(req, res, Campaign);
   });

// characters
router
   .get("/characters", async (req, res) => {
      getAllRequest(req, res, Character);
   })
   .post("/characters", async (req, res) => {
      postRequest(req, res, Character);
   })
   .get("/characters/:id", async (req, res) => {
      getOneRequest(req, res, Character);
   })
   .delete("/characters/:id", async (req, res) => {
      deleteOneRequest(req, res, Character);
   })
   .patch("/characters/:id", async (req, res) => {
      patchRequest(req, res, Character)
   })
   .put("/characters/:id", async (req, res) => {
      putRequest(req, res, Character);
   });

// npcs
router
   .get("/npcs", async (req, res) => {
      getAllRequest(req, res, Npc);
   })
   .post("/npcs", async (req, res) => {
      postRequest(req, res, Npc);
   })
   .get("/npcs/:id", async (req, res) => {
      getOneRequest(req, res, Npc);
   })
   .delete("/npcs/:id", async (req, res) => {
      deleteOneRequest(req, res, Npc);
   })
   .patch("/npcs/:id", async (req, res) => {
      patchRequest(req, res, Npc)
   })
   .put("/npcs/:id", async (req, res) => {
      putRequest(req, res, Npc);
   });

// locations
router
   .get("/locations", async (req, res) => {
      getAllRequest(req, res, Location);
   })
   .post("/locations", async (req, res) => {
      postRequest(req, res, Location);
   })
   .get("/locations/:id", async (req, res) => {
      getOneRequest(req, res, Location);
   })
   .delete("/locations/:id", async (req, res) => {
      deleteOneRequest(req, res, Location);
   })
   .patch("/locations/:id", async (req, res) => {
      patchRequest(req, res, Location)
   })
   .put("/locations/:id", async (req, res) => {
      putRequest(req, res, Location);
   });

// armies
router
   .get("/armies", async (req, res) => {
      getAllRequest(req, res, Army);
   })
   .post("/armies", async (req, res) => {
      postRequest(req, res, Army);
   })
   .get("/armies/:id", async (req, res) => {
      getOneRequest(req, res, Army);
   })
   .delete("/armies/:id", async (req, res) => {
      deleteOneRequest(req, res, Army);
   })
   .patch("/armies/:id", async (req, res) => {
      patchRequest(req, res, Army)
   })
   .put("/armies/:id", async (req, res) => {
      putRequest(req, res, Army);
   });

// quests
router
   .get("/quests", async (req, res) => {
      getAllRequest(req, res, Quest);
   })
   .post("/quests", async (req, res) => {
      postRequest(req, res, Quest);
   })
   .get("/quests/:id", async (req, res) => {
      getOneRequest(req, res, Quest);
   })
   .delete("/quests/:id", async (req, res) => {
      deleteOneRequest(req, res, Quest);
   })
   .patch("/quests/:id", async (req, res) => {
      patchRequest(req, res, Quest)
   })
   .put("/quests/:id", async (req, res) => {
      putRequest(req, res, Quest);
   });

module.exports = router;