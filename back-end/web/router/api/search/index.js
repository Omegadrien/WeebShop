var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameList (info) {
    var infoFiltered = {"content": [],
    "length" : info.contents.length,
    "offset" : info.contents.offset,
    "total" : info.contents.total};

    var length = info.contents.length;

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

function getGameList (offset, word, sort, priceMin, priceMax, before, infoToReturn) {
    var request = require('request');

    var url = 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language + '/titles?shop_id=1';

    if (typeof offset !== 'undefined') {
        url += "&offset=" + offset;
    }

    if (typeof word !== 'undefined') {
        url += "&freeword=" + word;
    }

    if (sort == "new" || sort == "popular" || sort == "score") {
        url += "&sort=" + sort;
    }

    if (priceMin !== 'undefined') {
        url += "&price_min=" + priceMin;
    }

    if (priceMax !== 'undefined') {
        url += "&price_max=" + priceMax;
    }

    if (before !== 'undefined') {
        url += "&release_date_before=+" + before;
    }

    console.log(url);

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
    var before = req.query.before;

    console.log(priceMin);

    getGameList(offset, word, sort, priceMin, priceMax, before, function(result) {
        res.json(filterGameList(result));

  });
});

module.exports = router;
