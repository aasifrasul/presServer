"use srict";

(function() {
	var Appointment = require('../models/appointments');
	var moment = require('moment');

	var appointments = {

		getDoctorAppointments: function(req, res) {
			var dateRange = getDateRange(req.params.from);
			Appointment.find({
					doctor_id: req.params.doctor_id,
					date_time: {
						$gte: dateRange.from,
						$lte: dateRange.to
					}
				},
				function(err, appointments) {
					if (err) {
						res.send(err);
					} else if (appointments) {
						res.json({
							"status": 200,
							"message": "Appointments Fetched",
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
							"message": "Np Appointment found"
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
			data.created_on = Date.now();
			data.updated_on = Date.now();
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
			data.updated_on = Date.now();
			if (!data.password) delete data.password;
			if (!data.created_on) data.created_on = Date.now();

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

	module.exports = appointments;

}());