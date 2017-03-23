var router = require('express').Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var language = "FR";

function filterNews (info) {
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

function getNews (infoToReturn) {
    var request = require('request');
    var options = {
    url: 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + language +
                                                  '/directories/?shop_id=1', //url that returns the directories of the home of the eShop
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

router.get('/', function (req, res) {

    getNews(function(result) {
    res.json(filterNews(result));
    
  });
});

module.exports = router;
