var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('./config');
var app = express();
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/ctr-common-1.key'),
  cert: fs.readFileSync('./keys/ctr-common-1.crt')
};

//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use("/", require("./web/index.js"));

var port = process.env.PORT;

https.createServer(options, app).listen(port, function() {
    console.log(`App runnning on port: ${port}`);
});
