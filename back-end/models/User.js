var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    isAdmin: Boolean,
    isActivated: Boolean,
    username: String,
    email: String,
    password: String,
    gameList: Array
});

module.exports = mongoose.model('User', userSchema);
