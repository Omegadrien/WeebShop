var router = require('express').Router();
var passport = require("passport");
var User = require('../../../../../models/User.js');

router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){

    var array = req.user.gameList;
    res.status(200).json(array);
});

router.post("/add", passport.authenticate('jwt', { session: false }), function(req, res){

  if (typeof req.body.name != 'undefined' && typeof req.body.id != 'undefined') {

      var titleName = req.body.name;
      var contentId = req.body.id;
      var updatedGameList = req.user.gameList;
      var isNew = true;

      for (var i = 0; i < updatedGameList.length; i++) {
          if (updatedGameList[i][1] == req.body.id) {
              isNew = false;
          }
      }

      if (isNew) {
          updatedGameList.push([titleName, contentId]);

          User.findByIdAndUpdate(req.user.id, { gameList: updatedGameList }, function(err, user) {
              if (err) throw err;
            });

            res.status(200).json("Game added to your wish list!");
      }
      else {
          res.status(400).json({message:"error, already added"});
      }

  }
  else {
      res.status(400).json({message:"error, bad request"});
  }
});

router.post("/remove", passport.authenticate('jwt', { session: false }), function(req, res){
    if (typeof req.body.id != 'undefined') {

        var gameList = req.user.gameList;
        var id = req.body.id;
        var index = -1;

        for (var i = 0; i < gameList.length; i++) {
            if (gameList[i][1] == req.body.id) {
                index = i;
                i = gameList.length; //exit loop
            }
        }

        if (index != -1) {
            gameList.splice(index, 1);

            User.findByIdAndUpdate(req.user.id, { gameList: gameList }, function(err, user) {
                if (err) throw err;
              });

              res.status(200).json("Game removed from your wish list!");

        }
        else {
            res.status(400).json({message:"error, bad id"});
        }

    }
    else {
        res.status(400).json({message:"error, bad request"});
    }
});

module.exports = router;
