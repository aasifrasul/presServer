"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var doctorSchema = new Schema({
        name: String,
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: String,
        location: String,
        age: Number,
        updated_on: Date,
        created_on: Date
    });

    // the schema is useless so far
    // we need to create a model using it
    var Doctor = mongoose.model('Doctor', doctorSchema);

    // make this available to our doctors in our Node applications
    module.exports = Doctor;

}());