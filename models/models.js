const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: true
   },
   email: String,
   password: {
      type: String,
      required: true
   },
   permissionLevel: String,
   googleId: String
});

userSchema.pre(
   "save",
   async (next) => {
      const user = this;
      const hash = await bcrypt.hash(this.password, saltRounds);

      this.password = hash;
      next();
   }
);

userSchema.methods.isValidPassword = async (password) => {
   const user = this;
   const compare = await bcrypt.compare(password, user.password);

   return compare
}

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

const questSchema = new mongoose.Schema({
   id: {
      type: String,
      unique: true,
      required: true
   },
   name: String,
   description: String,
   reward: String,
   notes: String,
   campaign: {
      type: campaignSchema,
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
      unique: true,
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
const Quest = new mongoose.model("Quest", questSchema);

exports.User = User; 
exports.Campaign = Campaign;
exports.Character = Character;
exports.Npc = Npc;
exports.Army = Army;
exports.Location = Location;
exports.Quest = Quest;