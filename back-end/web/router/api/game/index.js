//Improve the filter...

var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameInfo (info) {

    var infoFiltered = {"game": []};

    var value = {};

    value["name"] = info.title.formal_name;
    value["description"] = info.title.description;
    value["numberOfPlayers"] = info.title.number_of_players;
    value["copyrightedText"] = info.title.copyright.text;
    value["downloadSize"] = info.title.data_size;
    value["platform"] = info.title.platform.name;
    value["publisher"] = info.title.publisher.name;
    value["displayGenre"] = info.title.display_genre;
    value["ratingInfoIcon"] = info.title.rating_info.rating.icons;
    value["ratingInfoDescriptor"] = info.title.rating_info.descriptors.descriptor;
    value["starRatingInfo"] = {"score" : info.title.star_rating_info.score, "vote" : info.title.star_rating_info.votes}
    value["releaseDate"] = info.title.release_date_on_eshop;
    value["inAppPurchase"] = info.title.in_app_purchase;
    value["isNew"] = info.title.new;

    infoFiltered["game"].push(value);

    if (typeof info.title.movies != 'undefined') {
        infoFiltered["game"].push({"movie" : info.title.movies.movie});
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
        //res.json(result);
        res.json(filterGameInfo(result));

  });
});

module.exports = router;
