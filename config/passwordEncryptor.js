var bcrypt = require('bcrypt');

exports.cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(password, salt, function(err, hash) {
            return callback(err, hash);
        });

    });
};

exports.comparePassword = function(password, hashedPassword, callback) {
    bcrypt.compare(password, hashedPassword, function(err, isPasswordMatch) {
        if (err) return callback(err);
        return callback(null, isPasswordMatch);
    });
};