var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function getMessage (infoToReturn) {
    var request = require('request');
    var options = {
    url: 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language +
                                                  '/telops?shop_id=1', //url that returns the directories of the home of the eShop
    headers: {
      'Accept': 'application/json'
    }
 };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        infoToReturn(info.telops.telop[0]);
  }
};

  request(options, callback);
};

router.get('/', function (req, res) {

    getMessage(function(result) {
    res.json(result);

  });
});

module.exports = router;
