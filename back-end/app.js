var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('./config');

var app = express();

app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require("./web/index.js"));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`App runnning on port: ${port}`);
});
