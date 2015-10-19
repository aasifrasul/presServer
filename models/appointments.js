"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var appointmentSchema = new Schema({
        patient_name: {
            type: String,
            required: true
        },
        doctor_name: {
            type: String,
            required: true
        },
        age: Number,
        dateTime: {
            type: Date,
            required: true
        },
        mobile: {
          type: Number,
          required: true
        },
        doctor_id: String,
        patient_id: String,
        email: String,
        location: String,
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