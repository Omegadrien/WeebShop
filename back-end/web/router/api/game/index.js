var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function filterGameInfo (info) {

    // genres
    var genreInfo = [];
    for (var genreIndex = 0; genreIndex < info.title.genres.genre.length; genreIndex++) {
        var genreValue = {};
        genreValue["name"] = info.title.genres.genre[genreIndex].name;
        genreInfo.push(genreValue);
    }

    var infoFiltered = {};

    infoFiltered["name"] = info.title.formal_name;
    infoFiltered["description"] = info.title.description;
    infoFiltered["genre"] = genreInfo;
    infoFiltered["language"] = languageInfo;
    infoFiltered["numberOfPlayers"] = info.title.number_of_players;
    infoFiltered["copyrightedText"] = info.title.copyright.text;
    infoFiltered["downloadSize"] = info.title.data_size;
    infoFiltered["platform"] = info.title.platform.name;
    infoFiltered["publisher"] = info.title.publisher.name;
    infoFiltered["releaseDate"] = info.title.release_date_on_eshop;
    infoFiltered["inAppPurchase"] = info.title.in_app_purchase;
    infoFiltered["isNew"] = info.title.new;

    /// Optional data
    infoFiltered["iconUrl"] = info.title.icon_url;

    // language
    if (typeof info.title.languages != 'undefined') {
        var languageInfo = [];
        for (var languageIndex = 0; languageIndex < info.title.languages.language.length; languageIndex++) {
            var languageValue = {};
            languageValue["name"] = info.title.languages.language[languageIndex].name;
            languageInfo.push(languageValue);
        }
        infoFiltered["language"] = languageInfo;
    }

    // rating info icons
    if (typeof info.title.rating_info != 'undefined') {
        infoFiltered["ratingInfoIconUrl"] = info.title.rating_info.rating.icons.icon[0].url;
    }

    // star rating
    if (typeof info.title.star_rating_info != 'undefined') {
        infoFiltered["starRatingInfo"] = {"score" : info.title.star_rating_info.score,
                                    "numberVote" : info.title.star_rating_info.votes}
    }

    // features
    if (typeof info.title.features != 'undefined') {
        var featureInfo = [];
        for (var featureIndex = 0; featureIndex < info.title.features.feature.length; featureIndex++) {
            var featureValue = {};
            featureValue["name"] = info.title.features.feature[featureIndex].name;
            featureInfo.push(featureValue);
        }
        infoFiltered["feature"] = featureInfo;
    }

    // screenshots
    if (typeof info.title.screenshots != 'undefined') {
        var screenshotInfo = [];
        for (var screenshotIndex = 0; screenshotIndex < info.title.screenshots.screenshot.length; screenshotIndex++) {
            var screenshotValue = {};
            screenshotValue["upper"] = info.title.screenshots.screenshot[screenshotIndex].image_url[0].value;
            screenshotValue["lower"] = info.title.screenshots.screenshot[screenshotIndex].image_url[1].value;
            screenshotInfo.push(screenshotValue);
        }
        infoFiltered["screenshotUrl"] = screenshotInfo;
    }

    // movies
    if (typeof info.title.movies != 'undefined') {
        var movieInfo = [];
        for (var videoIndex = 0; videoIndex < info.title.movies.movie.length; videoIndex++ ) {
            var movieValue = {};
            movieValue["name"] = info.title.movies.movie[videoIndex].name;
            movieValue["bannerUrl"] = info.title.movies.movie[videoIndex].banner_url;
            movieValue["videoUrl"] = info.title.movies.movie[videoIndex].files.file[0].movie_url;
            movieInfo.push(movieValue);
        }
        infoFiltered["movie"] = movieInfo;
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
        res.json(filterGameInfo(result));
  });
});

module.exports = router;
