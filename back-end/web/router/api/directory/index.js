//DON'T FORGET to do the offset thing :)

var router = require('express').Router();
var config = require('../../../../config/index');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function infoFilteredLoop (data, max, info) {

    for(var index = 0; index < max; index++){
        var value = {};

        if ('title' in info.directory.contents.content[index]) { //if title
            value["name"] = info.directory.contents.content[index].title.name;
            value["contentId"] = info.directory.contents.content[index].title.id;
            value["contentType"] = "game";
            value["platformName"] = info.directory.contents.content[index].title.platform.name;
            value["iconUrl"] = info.directory.contents.content[index].title.icon_url;
            value["isNew"] = info.directory.contents.content[index].title.new;
        }
        else if ('movie' in info.directory.contents.content[index]) { //if movie
            value["name"] = info.directory.contents.content[index].movie.name;
            value["contentId"] = info.directory.contents.content[index].movie.id;
            value["contentType"] = "movie";
            value["iconUrl"] = info.directory.contents.content[index].movie.thumbnail_url;
            value["movieUrl"] = info.directory.contents.content[index].movie.files.file[0].movie_url;
            value["isNew"] = info.directory.contents.content[index].movie.new;
        }
        else {
            value["contentType"] = "unknow";
        }

        data["content"].push(value);
    }
    return data;
}

function filterDirectory (info) {

    var infoFiltered;
    var description = "";

    if ('description' in info.directory) {
        description = info.directory.description;
    }

    if ('length' in info.directory.contents && 'offset' in info.directory.contents) {

        infoFiltered = {"directoryName" : info.directory.name,
        "directoryBannerUrl" : info.directory.banner_url,
        "description" : description,
         "content": [],
         "length" : info.directory.contents.length,
         "offset" : info.directory.contents.offset,
         "total" : info.directory.contents.total};

         var length = info.directory.contents.length;

         infoFiltered = Loop (infoFiltered, length, info);

    }

    else {

        var total = info.directory.contents.total;

        infoFiltered = {"directoryName" : info.directory.name,
        "directoryBannerUrl" : info.directory.banner_url,
        "description" : description,
         "content": [],
         "total" : info.directory.contents.total};

         var length = info.directory.contents.length;
         var offset = info.directory.contents.offset;

         infoFiltered = infoFilteredLoop (infoFiltered, total, info);
    }

    return infoFiltered;
};

function getDirectory (directoryId, infoToReturn) {
    var request = require('request');
    var options = {
    url: 'https://samurai.ctr.shop.nintendo.net/samurai/ws/' + config.language +
                                                  '/directory/'+ directoryId +'?shop_id=1', //url that returns the content of the selected directory
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

    getDirectory(req.params.param, function(result) {
    res.json(filterDirectory(result));

  });
});

module.exports = router;
