var dotenv = require('dotenv');
var mongoose = require('mongoose');

var language = "FR";

var secretKey = "]rP/!sTWjDlB9%2h9A:lG>" //yeah!

dotenv.config();

mongoose.connect('mongodb://' + process.env.DB_HOST+
                ':' + process.env.DB_PORT +
                '/' + process.env.DB_NAME);

module.exports.secretKey = secretKey;
module.exports.language = language;
