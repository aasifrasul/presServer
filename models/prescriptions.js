"use srict";

(function() {

    // grab the things we need
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    // create a schema
    var prescriptionSchema = new Schema({
        patient_name: {
            type: String,
            required: true
        },
        doctor_name: {
            type: String,
            required: true
        },
        gender: {
            type: Boolean,
            required: true
        },
        age: Number,
        fee: Number,
        chief_complain: String,
        medical_history: String,
        hopi: String,
        diagnosis: String,
        recommendation: String,
        medicines: String,
        doctor_id: String,
        patient_id: String,
        date_time: {
            type: Date,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: String,
        address: String,
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