var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameList (info) {

    var length = info.contents.length;

    var infoFiltered = {"content": [],
    "length" : length,
    "offset" : info.contents.offset,
    "total" : info.contents.total};

    for(var index = 0; index < length; index++){
        var value = {};

        if ('title' in info.contents.content[index]) { //if title
            value["name"] = info.contents.content[index].title.name;
            value["contentId"] = info.contents.content[index].title.id;
            value["iconUrl"] = info.contents.content[index].title.icon_url;

        }

        infoFiltered["content"].push(value);
    }
    return infoFiltered;
};

function getGameList (offset, word, sort, priceMin, priceMax, genre, publisher, platform, infoToReturn) {
    var request = require('request');

    var url = 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language + '/titles?shop_id=1';

    if (typeof offset != 'undefined') {
        url += "&offset=" + offset;
    }

    if (typeof word != 'undefined') {
        url += "&freeword=" + word;
    }

    if (sort == "new" || sort == "popular" || sort == "score") {
        url += "&sort=" + sort;
    }

    if (typeof priceMin != 'undefined') {
        url += "&price_min=" + priceMin;
    }

    if (typeof priceMax != 'undefined') {
        url += "&price_max=" + priceMax;
    }

    if (typeof genre != 'undefined') { // "https://samurai.ctr.shop.nintendo.net/samurai/ws/{region}/genres" to have a human readable list of genres by id.
        url += "&genre[]=" + genre;
    }

    if (typeof publisher != 'undefined') { // "https://samurai.ctr.shop.nintendo.net/samurai/ws/{region}/publishers" to have a human readable list of publishers by id.
        url += "&publisher[]=" + publisher;
    }

    if (typeof platform != 'undefined') { // "https://samurai.ctr.shop.nintendo.net/samurai/ws/{region}/platforms" to have a human readable list of platforms by id.
        url += "&platform[]=" + platform;
    }

    var options = {
    url: url,
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

    var offset = req.query.offset;
    var word = req.query.word;
    var sort = req.query.sort;
    var priceMin = req.query.priceMin;
    var priceMax = req.query.priceMax;
    var genre = req.query.genre;
    var publisher = req.query.publisher;
    var platform = req.query.platform;

    getGameList(offset, word, sort, priceMin, priceMax, genre, publisher, platform, function(result) {
        res.json(filterGameList(result));
  });
});

module.exports = router;
