"use srict";

(function() {

    var User = require('../models/users');
    var passwordEncryptor = require('../config/passwordEncryptor');

    var users = {

        getAll: function(conds) {
            User.find(conds,
                function(err, users) {

                    if (err)
                        return err;
                    return users;
                });
        },

        getOne: function(req, res) {
            User.findById(req.params.id,
                function(err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
        },

        findOneByCond: function(conds, cb) {
            User.findOne(conds,
                function(err, user) {
                    cb(err, user);
                });
        },

        create: function(data, cb) {
            passwordEncryptor.cryptPassword(data.password, function(err, encryptedPassword) {
                data.password = encryptedPassword;
                console.log(data);
                var user = new User(data);
                user.save(function(err, result) {
                    console.log(err);
                    if (err)
                        cb(err);

                    cb(null,true);
                });
            });
        },

        update: function(req, res) {
            User.findById(req.params.id,
                function(err, user) {
                    if (err)
                        return err;

                    user.setData(req);
                    user.save(function(err, result) {
                        if (err)
                            return err;

                        return true;
                    });
                });

        },

        delete: function(req, res) {
            User.findById(req.params.id,
                function(err, user) {

                    if (err)
                        res.send(err);

                    user.remove().exec();
                });
        }
    };

    module.exports = users;

}());