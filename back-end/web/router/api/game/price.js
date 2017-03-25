var router = require('express').Router();
var config = require('../../../../config/index.js');

function getPrice (contentID, infoToReturn) {
    var request = require('request');
    var fs = require('fs')
        , path = require('path')
        , certFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.crt')
        , keyFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.key')
        , request = require('request');

    var options = {
        url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/"+ config.language + "/titles/online_prices?title[]=" + contentID,
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        headers: {
          'Accept': 'application/json'
        }
    };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        infoToReturn(info.online_prices.online_price[0].price.regular_price.amount);
    }
};

  request(options, callback);
};

router.get('/:param', function (req, res) {
    getPrice(req.params.param, function(result) {
        res.json(result);
    });
  });

module.exports = router;
