var router = require('express').Router();
var User = require('../../../../models/User.js');
var hash = require('../../../../helpers/hash.js');

router.get('/', function(req, res) {
    User.find({}).then(function(users) { //FindOne // find{username: blablaName} ...
        res.json(users);
    });
});


router.post('/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = hash.hashPassword(password);

    var gameList = [];

    var newUser = new User({
        isAdmin: false,
        isActivated: true,
        username: username,
        email: email,
        password: hashedPassword,
        gameList: gameList
    }).save().then(function(userSaved) {
        res.json(userSaved);
    });

});


module.exports = router;
