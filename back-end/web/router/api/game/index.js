var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameInfo (info) {

    ///// genres
    var genreInfo = [];
    for (var genreIndex = 0; genreIndex < info.title.genres.genre.length; genreIndex++) {
        var genreValue = {};
        genreValue["name"] = info.title.genres.genre[genreIndex].name;
        genreInfo.push(genreValue);
    }

    /// languages
    var languageInfo = [];
    for (var languageIndex = 0; languageIndex < info.title.languages.language.length; languageIndex++) {
        var languageValue = {};
        languageValue["name"] = info.title.languages.language[languageIndex].name;
        languageInfo.push(languageValue);
    }

    /// features
    var featureInfo = [];
    for (var featureIndex = 0; featureIndex < info.title.features.feature.length; featureIndex++) {
        var featureValue = {};
        featureValue["name"] = info.title.features.feature[featureIndex].name;
        featureInfo.push(featureValue);
    }

    /// screenshots
    var screenshotInfo = [];
    for (var screenshotIndex = 0; screenshotIndex < info.title.screenshots.screenshot.length; screenshotIndex++) {
        var screenshotValue = {};
        screenshotValue["upper"] = info.title.screenshots.screenshot[screenshotIndex].image_url[0].value;
        screenshotValue["lower"] = info.title.screenshots.screenshot[screenshotIndex].image_url[1].value;
        screenshotInfo.push(screenshotValue);
    }

    /// movies
    if (typeof info.title.movies != 'undefined') {
        var movieInfo = [];

        for (var videoIndex = 0; videoIndex < info.title.movies.movie.length; videoIndex++ ) {
            var movieValue = {};
            movieValue["name"] = info.title.movies.movie[videoIndex].name;
            movieValue["bannerUrl"] = info.title.movies.movie[videoIndex].banner_url;
            movieValue["videoUrl"] = info.title.movies.movie[videoIndex].files.file[0].movie_url;
            movieInfo.push(movieValue);
        }
    }

    var infoFiltered = {"game": []};
    var value = {};

    value["name"] = info.title.formal_name;
    value["description"] = info.title.description;
    value["genre"] = genreInfo;
    value["language"] = languageInfo;
    value["feature"] = featureInfo;
    value["numberOfPlayers"] = info.title.number_of_players;
    value["copyrightedText"] = info.title.copyright.text;
    value["downloadSize"] = info.title.data_size;
    value["platform"] = info.title.platform.name;
    value["publisher"] = info.title.publisher.name;
    value["ratingInfoIconUrl"] = info.title.rating_info.rating.icons.icon[0].url;
    value["starRatingInfo"] = {"score" : info.title.star_rating_info.score,
                                "numberVote" : info.title.star_rating_info.votes}
    value["releaseDate"] = info.title.release_date_on_eshop;
    value["inAppPurchase"] = info.title.in_app_purchase;
    value["isNew"] = info.title.new;
    value["screenshotUrl"] = screenshotInfo;
    value["movie"] = movieInfo;

    infoFiltered["game"].push(value);

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
        res.json(filterGameInfo(result));
  });
});

module.exports = router;
