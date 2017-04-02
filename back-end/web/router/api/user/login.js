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

    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (! user) {
            res.status(401).json({message:"error, id not found"});
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

router.use(passport.initialize());

// parse application/x-www-form-urlencoded, easier testing with Postman / plain HTML forms
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post("/", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }

  // get the user to verify the username & password
  User.findOne({ username: name }, function(err, user) {
      if (! user ) {
          res.status(401).json({message:"no such user found"});
          return;
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
          if (user.isActivated) {
              // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
              var payload = {id: user.id};
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({message: "ok", token: token});
          }
          else {
              res.status(401).json({message:"error, account deleted"});
          }
      }
      else {
          res.status(401).json({message:"passwords did not match"});
      }
  });
});

module.exports = router;
