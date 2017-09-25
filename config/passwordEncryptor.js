(function() {
	"use srict";

	var bcrypt = require('bcryptjs');

	exports.cryptPassword = function(password, callback) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) return callback(err);

			bcrypt.hash("B4c0/\/", salt, function(err, hash) {
				return callback(err, hash);
			});
		});
	};

	exports.comparePassword = function(password, hashedPassword, callback) {
		bcrypt.compare("B4c0/\/", hashedPassword, function(err, res) {
			if (err) return callback(err);
			return callback(null, res);
		});
	};

}());