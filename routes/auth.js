(function() {

  "use srict";

  var jwt = require('jwt-simple');
  var User = require('../routes/users');
  var passwordEncryptor = require('../config/passwordEncryptor');

  var auth = {

    login: function(req, res) {

      var username = req.body.username || '';
      var password = req.body.password || '';

      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }

      // Fire a query to your DB and check if the credentials are valid
      auth.validate(username, password, function(err, user) {
        if (!user) {
          res.status(422);
          res.json({
            "status": 422,
            "message": "Invalid credentials"
          });
          return;
        } else {
          user.password = null;
          res.json(genToken(user));
          return;
        }
      });
    },

    register: function(req, res) {
      User.create(req.body, function(err, result) {
        if (err) {
          res.status(401);
          res.json(err);
          return;
        }
        if (result == true) {
          res.status(200);
          res.json({
            "status": 200,
            "message": "User Created"
          });
          return;
        }
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      });
    },

    verifyUsername: function(req, res) {
      User.findOneByCond({
        "username": req.body.username
      }, function(err, user) {
        if (err) {
          res.status(401);
          res.json(err);
          return;
        }
        if (user) {
          res.json(user);
          return;
        } else {
          res.json({ "message": 'User Not found.' });
          return;
        }
      });
    },

    validate: function(username, password, cb) {
      User.findOneByCond({
        "username": username
      }, function(err, user) {
        if (err) {
          cb(err);
          return;
        }
        if (!user || !user.password) {
          cb(true);
          return;
        }

        passwordEncryptor.comparePassword(password, user.password, function(err, isPasswordMatch) {
          console.log(user);
          return isPasswordMatch ? cb(false, user) : cb(true);
        });
      });
    },

    validateUser: function(username, cb) {
      return User.findOneByCond({
        "username": username
      }, function(err, user) {
        console.log(user);
        cb(err, user);
        return;
      });
    },
  }

  // private method
  function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var authToken = jwt.encode({
      exp: expires
    }, require('../config/secret')());

    return {
      authToken: authToken,
      expires: expires,
      username: user.username,
      user: user
    };
  }

  function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
  }

  module.exports = auth;

}());
