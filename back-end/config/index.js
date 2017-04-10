var dotenv = require('dotenv');
var mongoose = require('mongoose');

function createSecretKey(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-_=+[]{};:,.<>/?";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


var language = "FR";
var secretKey = createSecretKey(32); //yeah!

dotenv.config();

mongoose.connect('mongodb://' + process.env.DB_HOST+
                ':' + process.env.DB_PORT +
                '/' + process.env.DB_NAME);

module.exports.secretKey = secretKey;
module.exports.language = language;
