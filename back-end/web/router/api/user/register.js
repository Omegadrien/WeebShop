var router = require('express').Router();
var User = require('../../../../models/User.js');
var hash = require('../../../../helpers/hash.js');

router.get('/checkUsername', function(req, res) {
    var name = req.query.username;
    if (typeof name != 'undefined') {
        User.findOne({ username: name }, function(err, user) {
            if (user) {
                res.status(200).json(true);
            }
            else {
                res.status(200).json(false);
            }
        });
    }
    else {
        res.status(400).json({message:"error, bad request"});
    }
});


router.post('/', function(req, res) {

    if (typeof req.body.username != 'undefined' && typeof req.body.password != 'undefined') {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var hashedPassword = hash.hashPassword(password);
        var gameList = [];

        User.findOne({ username: username }, function(err, user) {
            if (user) {
                res.status(401).json({message:"username already used"});
                return;
            }
            else {
                var newUser = new User({
                    isAdmin: false,
                    isActivated: true,
                    username: username,
                    email: email,
                    password: hashedPassword,
                    gameList: gameList
                }).save().then(function(userSaved) {
                    res.status(200).json({message:"user saved with success!"});
                });
            }
        });
    }
    else {
        res.status(400).json({message:"error, bad request"});
    }
});

module.exports = router;
