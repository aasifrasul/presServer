"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var appointmentSchema = new Schema({
        name: String,
        dateTime: {
            type: Date,
            required: true
        },
        doctor_id: String,
        patient_id: String,
        mobile: {
          type: Number,
          required: true
        },
        email: String,
        location: String,
        age: Number,
        updated_by: Number,
        updated_on: Date,
        created_by: Number,
        created_on: Date
    });

    // the schema is useless so far
    // we need to create a model using it
    var Appointment = mongoose.model('Appointment', appointmentSchema);

    // make this available to our appointments in our Node applications
    module.exports = Appointment;

}());