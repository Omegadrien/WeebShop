//To filter... /!\

var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameInfo (info) {
    var length = info.directories.length;
    var infoFiltered = {"directory": [], "length" : length};

    for(var index = 0; index < length; index++){
        var value = {};

        value["name"] = info.directories.directory[index].name;
        value["bannerUrl"] = info.directories.directory[index].banner_url;
        value["directoryId"] = info.directories.directory[index].id;
        value["isFixed"] = info.directories.directory[index].standard;
        value["isNew"] = info.directories.directory[index].new;

        infoFiltered["directory"].push(value);
    }
    return infoFiltered;
};

function getGameInfo (contentId, infoToReturn) {
    var request = require('request');
    var options = {
    url: 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language +
        '/title/' + contentId, //url that returns game informations
    headers: {
      'Accept': 'application/json'
    }
 };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        infoToReturn(info);
  }
};

  request(options, callback);
};

router.get('/:param', function (req, res) {


    getGameInfo(req.params.param, function(result) {
        res.json(result);
    //res.json(filterGameInfo(result));

  });
});

module.exports = router;
