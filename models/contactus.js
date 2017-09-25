(function() {

    "use srict";

    // grab the things we need
    var mongoose = require('mongoose');
    var passwordEncryptor = require('../config/passwordEncryptor');
    var Schema = mongoose.Schema;

    // create a schema
    var contactusSchema = new Schema({
        name: String,
        mobile: Number,
        email: String,
        message: String,
        created_on: Number
    });

    // the schema is useless so far
    // we need to create a model using it
    var Contactus = mongoose.model('Contactus', contactusSchema);

    // make this available to our contactuss in our Node applications
    module.exports = Contactus;

}());