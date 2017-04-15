var router = require('express').Router();
var passport = require("passport");

router.use('/gameList', require('./gameList.js'));
router.use('/admin', require('./admin.js'));

router.get("/", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});

router.get("/isAdmin", passport.authenticate('jwt', { session: false }), function(req, res){
    if (req.user.isAdmin) {
            res.status(200).json({isAdmin:true});
    }
    else {
        res.status(200).json({isAdmin:false});
    }
});

module.exports = router;
