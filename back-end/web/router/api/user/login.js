var router = require('express').Router();
var bodyParser = require('body-parser');
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var config = require('../../../../config/index.js');
var User = require('../../../../models/User.js');
var bcrypt = require('bcrypt');

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secretKey;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

router.use(passport.initialize());

// parse application/x-www-form-urlencoded, easier testing with Postman or plain HTML forms
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post("/", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }

  // get the user
  User.findOne({ username: name }, function(user) {
      if (! user ) {
          res.status(401).json({message:"no such user found"});
          return;
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
          // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
          var payload = {id: user.id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token});
      }
      else {
          res.status(401).json({message:"passwords did not match"});
      }

  });
});

module.exports = router;
