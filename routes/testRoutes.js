const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
   res.json({
      message: "Welcome out of the danger zone!",
      user: req.user,
      token: req.query.secret_token
   })
});

module.exports = router;