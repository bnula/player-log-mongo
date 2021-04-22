const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   userName: String,
   email: String,
   password: String,
   googleId: String
});

const campaignSchema = new mongoose.Schema({
   id: {
      type: String,
      unique:true,
      required: true
   },
   name: String,
   visibleTo: [userSchema],
   createdBy: userSchema,
   lastUpdate: {
      updatedBy: userSchema,
      updatedOn: Date
   },
   active: Boolean
});

const locationSchema = new mongoose.Schema({
   id: {
      type: String,
      unique:true,
      required: true
   },
   name: String,
   description: String,
   notes: String,
   inventory: String,
   campaign: {
      type:campaignSchema,
      required: true
   },
   visibleTo: [userSchema],
   createdBy: userSchema,
   lastUpdate: {
      updatedBy: userSchema,
      updatedOn: Date
   },
   active: Boolean
});

const characterSchema = new mongoose.Schema({
   id: {
      type: String,
      unique:true,
      required: true
   },
   name: String,
   level: Number,
   description: String,
   notes: String,
   campaign: {
      type:campaignSchema,
      required: true
   },
   visibleTo: [userSchema],
   createdBy: userSchema,
   lastUpdate: {
      updatedBy: userSchema,
      updatedOn: Date
   },
   active: Boolean
});

const npcSchema = new mongoose.Schema({
   id: {
      type: String,
      unique:true,
      required: true
   },
   name: String,
   allegiance: String,
   description: String,
   notes: String,
   campaign: {
      type:campaignSchema,
      required: true
   },
   visibleTo: [userSchema],
   createdBy: userSchema,
   lastUpdate: {
      updatedBy: userSchema,
      updatedOn: Date
   },
   active: Boolean
});

const armySchema = new mongoose.Schema({
   id: {
      type: String,
      unique:true,
      required: true
   },
   name: String,
   composition: String,
   description: String,
   notes: String,
   campaign: {
      type:campaignSchema,
      required: true
   },
   visibleTo: [userSchema],
   createdBy: userSchema,
   lastUpdate: {
      updatedBy: userSchema,
      updatedOn: Date
   },
   active: Boolean
});

const User = new mongoose.model("User", userSchema);
const Campaign = new mongoose.model("Campaign", campaignSchema);
const Character = new mongoose.model("Character", characterSchema);
const Npc = new mongoose.model("Npc", npcSchema);
const Army = new mongoose.model("Army", armySchema);
const Location = new mongoose.model("Location", locationSchema);

exports.User = User; 
exports.Campaign = Campaign;
exports.Character = Character;
exports.Npc = Npc;
exports.Army = Army;
exports.Location = Location;