(function() {

    "use srict";

    var Prescription = require('../models/prescriptions');

    var prescriptions = {

        getDoctorPrescriptions: function(req, res) {
            Prescription.find({doctor_id:req.params.doctor_id},
                function(err, prescriptions) {
                    if (err) {
                        res.send(err);
                    } else if (prescriptions) {
                        res.json({
                            "status": 200,
                            "message": "Prescription Fetched",
                            "prescriptions": prescriptions
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
            console.log('Hi');
            Prescription.findById(req.params.id,
                function(err, prescription) {
                    if (err) {
                        res.send(err);
                    } else if (prescription) {
                        res.json({
                            "status": 200,
                            "message": "Prescription Fetched",
                            "prescription": prescription
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "status": 200,
                            "message": "No Prescriptions found"
                        });
                    }
                    return;
                });
        },

        findOneByCond: function(conds, cb) {
            Prescription.findOne(conds,
                function(err, prescription) {
                    cb(err, prescription);
                    return;
                });
        },

        create: function(req, res) {
            data = req.body;
            data.created_on = new Date();
            data.updated_on = new Date();
            var prescription = new Prescription(data);

            prescription.save(function(err, result) {
                if (err) {
                    res.send(err);
                } else if (result) {
                    res.json({
                        "status": 200,
                        "message": "Prescription Created",
                        "prescription": prescription
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

            Prescription.findByIdAndUpdate(req.params.id, data, [],
                function(err, prescription) {
                    if (err) {
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
                        "message": "Prescription Updated",
                        "prescription": prescription
                    });
                    return;
                });
        },

        delete: function(req, res) {
            Prescription.remove({
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
                        "message": "Prescription Deleted"
                    });
                    return;
                });
        }
    };

    module.exports = prescriptions;

}());