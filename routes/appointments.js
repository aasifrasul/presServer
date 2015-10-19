"use srict";

(function() {

    var Appointment = require('../models/appointments');

    var appointments = {

        getUserAppointments: function(req, res) {
            Appointment.find(req.params.userid,
                function(err, appointments) {
                    if (err) {
                        res.send(err);
                    } else if (appointments) {
                        res.json({
                            "status": 200,
                            "message": "Appointment Fetched",
                            "appointments": appointments
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "status": 200,
                            "message": "No Appointments Found."
                        });
                    }
                    return;
                });
        },

        getOne: function(req, res) {
            Appointment.findById(req.params.id,
                function(err, appointment) {
                    if (err) {
                        res.send(err);
                    } else if (appointment) {
                        res.json({
                            "status": 200,
                            "message": "Appointment Fetched",
                            "appointment": appointment
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "status": 200,
                            "message": "Np Appointments found"
                        });
                    }
                    return;
                });
        },

        findOneByCond: function(conds, cb) {
            Appointment.findOne(conds,
                function(err, appointment) {
                    cb(err, appointment);
                    return;
                });
        },

        create: function(req, res) {
            data = req.body;
            data.created_on = new Date();
            data.updated_on = new Date();
            console.log(data);
            var appointment = new Appointment(data);
            appointment.save(function(err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else if (result) {
                    res.json({
                        "status": 200,
                        "message": "Appointment Created",
                        "appointment": appointment
                    });
                }
                return;
            });
        },

        update: function(req, res) {
            var data = req.body;
            data.dob = new Date(data.dob);
            data.updated_on = new Date();
            if (!data.password) delete data.password;
            if (!data.created_on) data.created_on = new Date();
            console.log(data);

            Appointment.findByIdAndUpdate(req.params.id, data, [],
                function(err, appointment) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({
                            "status": 500,
                            "message": "Internal Server Error"
                        });
                        return;
                    }

                    res.status(200);
                    res.json({
                        "status": 200,
                        "message": "Appointment Updated",
                        "appointment": appointment
                    });
                    return;
                });
        },

        delete: function(req, res) {
            Appointment.remove({
                    "_id": req.params.id
                },
                function(err) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.status(200);
                    res.json({
                        "status": 200,
                        "message": "Appointment Deleted"
                    });
                    return;
                });
        }
    };

    module.exports = appointments;

}());