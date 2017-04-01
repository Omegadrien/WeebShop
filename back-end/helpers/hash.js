var bcrypt = require('bcrypt');

module.exports.hashPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
