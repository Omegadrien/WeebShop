var router = require('express').Router();
var passport = require("passport");

router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});

module.exports = router;
