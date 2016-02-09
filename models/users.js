"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var passwordEncryptor = require('../config/passwordEncryptor');
    var Schema = mongoose.Schema;

    // create a schema
    var userSchema = new Schema({
        name: String,
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        admin: Number,
        address: String,
        dob: Date,
        updated_by: Number,
        updated_on: Date,
        created_by: Number,
        created_on: Date
    });

    userSchema.methods.generateHash = function(password) {
        return this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    userSchema.methods.verifyPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    userSchema.methods.setData = function(data) {
        passwordEncryptor.cryptPassword(data.password, function(err, encryptedPassword) {
            this.password = encryptedPassword;
            if (data.username) this.username = data.username;
            if (data.name) this.name = data.name;
            if (data.mobile) this.mobile = data.mobile;
            if (data.age) this.age = data.age;
            if (data.dob) this.dob = data.dob;
            if (data.address) this.address = data.address;
            this.updated_on = new Date();
            if (!this.created_on || this.created_on.length == 0) this.created_on = new Date();
        });
    };

    // the schema is useless so far
    // we need to create a model using it
    var User = mongoose.model('User', userSchema);

    // make this available to our users in our Node applications
    module.exports = User;

}());