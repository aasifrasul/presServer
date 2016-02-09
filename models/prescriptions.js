(function() {

    "use srict";

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
        date_time: {
            type: Date,
            required: true
        },
        age: Number,
        mobile: Number,
        occupation: String,
        fee: Number,
        chief_complain: String,
        medical_history: String,
        hopi: String,
        investigation: String,
        diagnosis: String,
        prognosis: String,
        treatment_plan: String,
        medicines: String,
        doctor_id: String,
        patient_id: String,
        email: String,
        address: String,
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