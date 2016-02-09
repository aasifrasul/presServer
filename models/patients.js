"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var doctorSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        location: String,
        dob: Date,
        updated_by: Number,
        updated_on: Date,
        created_by: Number,
        created_on: Date
    });

    // the schema is useless so far
    // we need to create a model using it
    var Patient = mongoose.model('Patient', doctorSchema);

    // make this available to our doctors in our Node applications
    module.exports = Patient;

}());