(function() {

	"use srict";

	var Prescription = require('../models/prescriptions');

	var prescriptions = {

		getDoctorPrescriptions: function(req, res) {
            var dateRange = getDateRange(req.params.from);
			Prescription.find({
					doctor_id: req.params.doctor_id,
                    date_time: {
                        $gte: dateRange.from,
                        $lte: dateRange.to
                    }
				},
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
			data.created_on = Date.now();
			data.updated_on = Date.now();
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
			data.dob = Date.parse(data.dob);
			data.updated_on = Date.now();
			if (!data.password) delete data.password;
			if (!data.created_on) data.created_on = Date.now();

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

    function getDateRange(from) {
        var curDate = new Date();
        var curstartDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());
        var since = 0;
        var till = 0;
        var dateRange = {};

        from = from || 'Today';

        switch (from) {
            case 'Today':
                since = 0;
                till = 1;
                break;
            case 'Yesterday':
                since = 1;
                break;
            case 'Last Week':
                since = 7;
                break;
            case 'Last Month':
                since = 30;
                break;
            case 'Last Year':
                since = 365;
                break;
            case 'All':
                since = 1000;
                till = 1000;
                break;
        }

        dateRange.from = curstartDate.getTime() - (since * 24 * 60 * 60 * 1000);
        dateRange.to = curstartDate.getTime() + (till * 24 * 60 * 60 * 1000);

        return dateRange;
    }

	module.exports = prescriptions;

}());