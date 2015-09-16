"use srict";

(function() {

    var express = require("express"),
        mongoose = require('mongoose'),
        async = require('async'),
        router = express.Router(),
        mongodb = require('mongodb'),
        underscore = require('underscore'),
        expressValidator = require('express-validator'),
        app = express(),
        Db = mongodb.Db,
        Server = mongodb.Server,
        bodyParser = require('body-parser'),
        db = new Db('prescriptions', new Server('localhost', '27017')),
        passwordEncryptor = require('./passwordEncryptor'),
        User = require('./models/users'),
        Appointment = require('./models/appointments'),
        Patient = require('./models/patients'),
        Prescription = require('./models/prescriptions');

    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(expressValidator([]));

    mongoose.connect('mongodb://localhost/prescriptions');

    // route middleware that will happen on every req
    router.use(
        function(req, res, next) {
            console.log(req.body);

            // log each req to the console
            console.log(req.method, req.url);
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token,X-Key, Content-Type, Accept");

            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                // continue doing what we were doing and go to the route
                next('route');
            }
        });

    router.route('/users')
        .post(
            function(req, res) {

                passwordEncryptor.cryptPassword(req.body.password, function(err, encryptedPassword) {
                    var user = new User();
                    user.password = encryptedPassword;
                    user.username = req.body.username;
                    user.name = req.body.name;
                    user.mobile = req.body.mobile;
                    user.age = req.body.age;
                    user.admin = req.body.admin ? req.body.admin : 1;
                    user.created_on = new Date();
                    user.updated_on = new Date();

                    user.save(
                        function(err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({
                                    message: 'User created!'
                                });
                            }
                        });
                });

            })
        .get(
            function(req, res) {
                User.find(
                    function(err, users) {
                        if (err)
                            res.send(err);

                        res.json(users);
                    });
            });

    router.route('/user/:id')
        .get(
            function(req, res) {
                User.findById(req.params.id,
                    function(err, user) {
                        if (err)
                            res.send(err);
                        res.json(user);
                    });
            })
        .put(
            function(req, res) {

                User.findById(req.params.id,
                    function(err, user) {

                        if (err)
                            res.send(err);

                        if (req.body.name) user.name = req.body.name;
                        if (req.body.mobile) user.mobile = req.body.mobile;
                        if (req.body.age) user.age = req.body.age;
                        if (req.body.dob) user.dob = req.body.dob;
                        if (req.body.address) user.address = req.body.address;
                        user.updated_on = new Date();
                        console.log(user);
                        // save the user
                        user.save(function(err) {
                            if (err)
                                res.send(err);

                            res.json({
                                message: 'User updated!'
                            });
                        });
                    });
            })
        .delete(
            function(req, res) {
                User.remove({
                        _id: req.params.id
                    },
                    function(err, user) {
                        if (err)
                            res.send(err);

                        res.json({
                            message: 'User deleted'
                        });
                    });
            });


    router.route('/user/login')
        .post(
            function(req, res) {
                var user = {};
                user.username = req.body.username;

                User.findOne(user,
                    function(err, dbUser) {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        if (!dbUser) {
                            res.json(false);
                            return;
                        }
                        passwordEncryptor.comparePassword(req.body.password, dbUser.password, function(err, isPasswordMatch) {
                            if (err) res.send(err);
                            var result = {};
                            result.isSuccess = isPasswordMatch;
                            result.user = isPasswordMatch ? dbUser : null;
                            console.log(result);
                            res.json(result);
                            return;
                        });
                    });

            });


    router.route('/appointments')
        .post(
            function(req, res) {

                var appointment = new Appointment(); // create a new instance of the Appointment model
                appointment.name = req.body.name;
                appointment.mobile = req.body.mobile;
                appointment.age = req.body.age;
                appointment.dateTime = req.body.dateTime;
                appointment.doctor_id = (req.body.doctor_id);
                appointment.patient_id = (req.body.patient_id);
                appointment.created_on = new Date();
                appointment.updated_on = new Date();

                appointment.save(
                    function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                message: 'Appointment created!'
                            });
                        }
                    });
            })
        .get(
            function(req, res) {
                Appointment.find(
                    function(err, appointments) {
                        if (err)
                            res.send(err);

                        res.json(appointments);
                    });
            });

    router.route('/appointment/:id')
        .get(
            function(req, res) {
                Appointment.findById(req.params.id,
                    function(err, appointment) {
                        if (err)
                            res.send(err);
                        res.json(appointment);
                    });
            })
        .put(
            function(req, res) {

                Appointment.findById(req.params.id,
                    function(err, appointment) {

                        if (err)
                            res.send(err);

                        if (req.body.appointmentname) appointment.appointmentname = req.body.appointmentname; // set the appointments name (comes from the req)
                        if (req.body.password) appointment.password = req.body.password;
                        if (req.body.name) appointment.name = req.body.name;
                        if (req.body.mobile) appointment.mobile = req.body.mobile;
                        if (req.body.age) appointment.age = req.body.age;
                        appointment.updated_on = new Date();

                        // save the appointment
                        appointment.update({
                                "update": true
                            },
                            function(err) {
                                if (err)
                                    res.send(err);

                                res.json({
                                    message: 'Appointment updated!'
                                });
                            });
                    });
            })
        .delete(
            function(req, res) {
                Appointment.remove({
                        _id: req.params.id
                    },
                    function(err, appointment) {
                        if (err)
                            res.send(err);

                        res.json({
                            message: 'Appointment deleted'
                        });
                    });
            });


    router.route('/patients')
        .post(
            function(req, res) {

                var patient = new Patient(); // create a new instance of the Patient model
                patient.name = req.body.name;
                patient.mobile = req.body.mobile;
                patient.dob = req.body.dob;
                patient.created_on = new Date();
                patient.updated_on = new Date();

                patient.save(
                    function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                message: 'Patient created!'
                            });
                        }
                    });
            })
        .get(
            function(req, res) {
                Patient.find(
                    function(err, patients) {
                        if (err)
                            res.send(err);

                        res.json(patients);
                    });
            });

    router.route('/patient/:id')
        .get(
            function(req, res) {
                Patient.findById(req.params.id,
                    function(err, patient) {
                        if (err)
                            res.send(err);
                        res.json(patient);
                    });
            })
        .put(
            function(req, res) {

                Patient.findById(req.params.id,
                    function(err, patient) {

                        if (err)
                            res.send(err);

                        if (req.body.name) patient.name = req.body.name;
                        if (req.body.mobile) patient.mobile = req.body.mobile;
                        if (req.body.dob) patient.dob = req.body.dob;
                        patient.updated_on = new Date();

                        // save the patient
                        patient.update({
                                "update": true
                            },
                            function(err) {
                                if (err)
                                    res.send(err);

                                res.json({
                                    message: 'Patient updated!'
                                });
                            });
                    });
            })
        .delete(
            function(req, res) {
                Patient.remove({
                        _id: req.params.id
                    },
                    function(err, patient) {
                        if (err)
                            res.send(err);

                        res.json({
                            message: 'Patient deleted'
                        });
                    });
            });


    router.route('/prescriptions')
        .post(
            function(req, res) {

                var prescription = new Prescription(); // create a new instance of the Prescription model
                prescription.fee = req.body.fee;
                prescription.name = req.body.name;
                prescription.mobile = req.body.mobile;
                prescription.age = req.body.age;
                prescription.doctor_id = req.body.doctor_id;
                prescription.patient_id = req.body.patient_id;
                prescription.dateTime = req.body.dateTime;
                prescription.email = req.body.email;
                prescription.created_on = new Date();
                prescription.updated_on = new Date();

                prescription.save(
                    function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                message: 'Prescription created!'
                            });
                        }
                    });
            })
        .get(
            function(req, res) {
                Prescription.find(
                    function(err, prescriptions) {
                        if (err)
                            res.send(err);

                        res.json(prescriptions);
                    });
            });

    router.route('/prescription/:id')
        .get(
            function(req, res) {
                Prescription.findById(req.params.id,
                    function(err, prescription) {
                        if (err)
                            res.send(err);
                        res.json(prescription);
                    });
            })
        .put(
            function(req, res) {

                Prescription.findById(req.params.id,
                    function(err, prescription) {

                        if (err)
                            res.send(err);

                        if (req.body.password) prescription.password = req.body.password;
                        if (req.body.name) prescription.name = req.body.name;
                        if (req.body.mobile) prescription.mobile = req.body.mobile;
                        if (req.body.age) prescription.age = req.body.age;
                        if (req.body.email) prescription.email = req.body.email;
                        prescription.updated_on = new Date();

                        // save the prescription
                        prescription.update({
                                "update": true
                            },
                            function(err) {
                                if (err)
                                    res.send(err);

                                res.json({
                                    message: 'Prescription updated!'
                                });
                            });
                    });
            })
        .delete(
            function(req, res) {
                Prescription.remove({
                        _id: req.params.id
                    },
                    function(err, prescription) {
                        if (err)
                            res.send(err);

                        res.json({
                            message: 'Prescription deleted'
                        });
                    });
            });

    // apply the routes to our application
    app.use('/', router);

    app.set('port', process.env.PORT || 3000);

    //app.listen(port);
    var server = app.listen(app.get('port'), function() {
        console.log('Prescriptions Server Started at /var/www/Code/nodejs/prescriptions.server.js listening on ' + app.get('port') + '!!!');
    });

}());