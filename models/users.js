"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
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
        doctor: {
            type: Object,
            required: false
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        admin: Number,
        address: String,
        dob: Number,
        updated_by: Number,
        updated_on: Date,
        created_by: Number,
        created_on: Date
    });

    // the schema is useless so far
    // we need to create a model using it
    var User = mongoose.model('User', userSchema);

    // make this available to our users in our Node applications
    module.exports = User;

}());