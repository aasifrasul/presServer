"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var prescriptionSchema = new Schema({
        patient_name: String,
        doctor_name: String,
        fee: Number,
        diagnosis: String,
        recommendation: String,
        medicines: String,
        doctor_id: String,
        patient_id: String,
        dateTime: {
            type: Date,
            required: true
        },
        mobile: {
            type: String,
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
    var Prescription = mongoose.model('Prescription', prescriptionSchema);

    // make this available to our prescriptions in our Node applications
    module.exports = Prescription;

}());