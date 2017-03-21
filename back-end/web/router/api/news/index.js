var router = require('express').Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var language = "FR";

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
      var test = {"directories":
                    {"directory":
                      [{"name":"YO-KAI WATCH™ 2 :\nVersion démo spéciale",
                      "icon_url":"https://kanzashi-ctr.cdn.nintendo.net/i/729af71d3a7ba8a5d16c5d2fd5688ee924b73c11973636f995922a7fdeed1725.jpg",
                      "icon_width":128,"icon_height":96,
                      "banner_url":"https://kanzashi-ctr.cdn.nintendo.net/i/44c398e2feabbc19477db475f747b2cb4662380a9b0d2635a16675d4fc0f38f2.jpg"
                    }]
                  }};
      //res.json(test);
      res.json(result);
  });
});

module.exports = router;
