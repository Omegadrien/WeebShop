var router = require('express').Router();
var config = require('../../../../config/index');

function getTitleID (infoToReturn) {
    var request = require('request');
    var fs = require('fs')
        , path = require('path')
        , certFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.crt')
        , keyFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.key')
        , request = require('request');

    var options = {
        //url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/titles/id_pair?title_id[]=0004000000030200",
        //url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/FR/title/50010000009122/ec_info",
        //url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/country/FR",
        url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/FR/titles/online_prices?title[]=50010000009122",

        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        headers: {
          'Accept': 'application/json'
        }
    };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var info = JSON.parse(body);
        infoToReturn(body);
  }
};

  request(options, callback);
};


router.get('/', function (req, res) {

    getTitleID(function(result) {
        res.send(result);
    });

  });

module.exports = router;
