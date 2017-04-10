var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterPublishers (info) {
    var length = info.publishers.length;
    var infoFiltered = {"publisher": [], "length" : length};

    for(var index = 0; index < length; index++){
        var value = {};

        value["name"] = info.publishers.publisher[index].name;
        value["id"] = info.publishers.publisher[index].id;

        infoFiltered["publisher"].push(value);
    }
    return infoFiltered;
};

function getPublishers (infoToReturn) {
    var request = require('request');
    var options = {
    url: 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language +
                                                  '/publishers?shop_id=1', //url that returns the directories of the home of the eShop
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

    getPublishers(function(result) {
        res.json(filterPublishers(result));
  });
});

module.exports = router;
