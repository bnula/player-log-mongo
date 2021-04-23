const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIV_KEY;

router.post("/register", (req, res) => {
   passport.authenticate("register", { session: false }),
   async (req, res, next) => {
      res.json({
         message: "Registration successful",
         user: req.user
      });
   }
});

router.post("/login", async (req, res, next) => {
   passport.authenticate("login", async (err, user, info) => {
      try {
         if (err || !user) {
            const error = new Error("Something went wrong..");
            return next(error);
         }
         req.login(user, {session: false}, async(error) => {
            if (error) return next(error);
            const body = {_id: user._id, email:user.email};
            const token = jwt.sign({user: body}, privateKey)
            return res.json({token})
         })
      } catch (error) {
      }
   })(req, res, next);
});

module.exports = router;