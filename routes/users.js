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
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.json(user);
                    return;
                });
        },

        findOneByCond: function(conds, cb) {
            User.findOne(conds,
                function(err, user) {
                    cb(err, user);
                    return;
                });
        },

        create: function(data, cb) {
            passwordEncryptor.cryptPassword(data.password, function(err, encryptedPassword) {
                data.password = encryptedPassword;
                console.log(data);
                var user = new User(data);
                user.save(function(err, result) {
                    console.log(err);
                    if (err) {
                        cb(err);
                        return;
                    }

                    cb(null, true);
                    return;
                });
            });
        },

        update: function(req, res) {
            User.findById(req.params.id,
                function(err, user) {
                    if (err) {
                        res.status(500);
                        res.json({
                            "status": 500,
                            "message": "Internal Server Error"
                        });
                        return;
                    }

                    user.save(req.body, function(err, result) {
                        if (err) {
                            res.status(500);
                            res.json({
                                "status": 500,
                                "message": "User Failled to Update"
                            });
                            return;
                        }
                        res.status(200);
                        res.json({
                            "status": 200,
                            "message": "User Updated",
                            "user": user
                        });
                        return;
                    });
                });
        },

        delete: function(req, res) {
            User.findById(req.params.id,
                function(err, user) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    user.remove().exec();
                    return;
                });
        }
    };

    module.exports = users;

}());