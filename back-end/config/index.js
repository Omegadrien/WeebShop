var dotenv = require('dotenv');
var mongoose = require('mongoose');

var language = "FR";

dotenv.config();

/* //Useless for now
mongoose.connect('mongodb://' + process.env.DB_HOST+
                ':' + process.env.DB_PORT +
                '/' + process.env.DB_NAME);

*/

module.exports.language = language;
