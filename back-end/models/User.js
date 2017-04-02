var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    isAdmin: { type: Boolean, required: true },
    isActivated: { type: Boolean, required: true },
    username: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    gameList: Array,
    created_at: Date
});

module.exports = mongoose.model('User', userSchema);
