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
                    } else if(user) {
                        res.json({
                            "status": 200,
                            "message": "User Fetched",
                            "user": user
                        });
                    } else {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid credentials"
                        });
                    }
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
                data.created_on = new Date();
                data.updated_on = new Date();
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
            var data = req.body;
            data.dob = new Date(data.dob);
            data.updated_on = new Date();
            if(!data.password) delete data.password;
            if(!data.created_on) data.created_on = new Date();
            console.log(data);

            User.findByIdAndUpdate(req.params.id, data, [],
                function(err, user) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({
                            "status": 500,
                            "message": "Internal Server Error"
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
        },

        delete: function(req, res) {
            User.find({id:req.params.id}).remove(
                function(err, user) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.status(200);
                    res.json({
                        "status": 200,
                        "message": "User Deleted"
                    });
                    return;
                });
        }
    };

    module.exports = users;

}());