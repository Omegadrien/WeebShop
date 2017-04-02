var router = require('express').Router();
var passport = require("passport");
var User = require('../../../../../models/User.js');

router.get("/getUserList", passport.authenticate('jwt', { session: false }), function(req, res){
    if (req.user.isAdmin) {

        User.find({}, function(err, users) {
            var userMap = {};

            users.forEach(function(user) {
              userMap[user._id] = user;
            });

            res.status(200).json(userMap);
         });

    }
    else {
        res.status(401).json({message:"error, you're not admin"});
    }
});

router.post("/deleteUser", passport.authenticate('jwt', { session: false }), function(req, res){
    if (req.user.isAdmin) {
        var userId = req.body.id;

        if (typeof userId != 'undefined') {

            User.findByIdAndUpdate(userId, { isActivated: false }, function(err, user) {
                if (err) throw err;
              });

              res.status(200).json("remove user, done!");
        }
        else {
            res.status(400).json({message:"error, bad request"});
        }
    }
    else {
        res.status(401).json({message:"error, you're not admin"});
    }
});

module.exports = router;
