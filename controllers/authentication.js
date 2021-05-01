const {User} = require("../models/models");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const privateKey = process.env.PRIV_KEY;

passport.use("register",
   new localStrategy({
      usernameField: "email",
      passwordField: "password"
   },
   async (email, password, done) => {
      try {
         const user = await User.create({email, password});
         return done(null, user);
      } catch (err) {
         console.log(err);
         done(err);
      };
   })
);

passport.use("login",
   new localStrategy({
      usernameField: "email",
      passwordField: "password"
   },
   async (email, password, done) => {
      try {
         const user = await User.findOne({email});
         if (!user) {
            return done(null, "false", {message: "User not found"});
         }
         const validate = await user.isValidPassword(password);
         if (!validate) {
            return done(null, "false", {message: "Wrong Password"});
         }
         return done(null, user, {message: "Logged Successfully"});
      } catch(err) {
         return done(err);
      };
   })
);

passport.use(new jwtStrategy({
   secretOrKey: privateKey,
   jwtFromRequest: extractJwt.fromUrlQueryParameter("secret_token")
   },
   async (token, done) => {
      try {
         return done(null, token.user);
      } catch (error) {
         done(error);
      }
   })
);