var router = require('express').Router();
var config = require('../../../../config/index.js');

function getDownloadUrl (ContentID, infoToReturn) {
    var request = require('request');
    var fs = require('fs')
        , path = require('path')
        , certFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.crt')
        , keyFile = path.resolve(__dirname, '../../../../keys/ctr-common-1.key')
        , request = require('request');

    var options = {
        url: "https://ninja.ctr.shop.nintendo.net/ninja/ws/" + config.language + "/title/" + ContentID + "/ec_info",
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        headers: {
          'Accept': 'application/json'
        }
    };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);

        if (info.title_ec_info.disable_download = "false") {
            infoToReturn("http://ccs.cdn.c.shop.nintendowifi.net/ccs/download/" + info.title_ec_info.title_id + "/00000000"); // we need to parse the /tmd file to know what content we need to download. Here, we just try to download the content 00000000.
        }
        else {
            infoToReturn("Error, not available.");
        }

  }
};

  request(options, callback);
};

router.get('/:param', function (req, res) {
    getDownloadUrl(req.params.param, function(result) {
        res.json(result);
    });
  });

module.exports = router;
