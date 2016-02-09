(function() {

	"use srict";

	var express = require('express');
	var router = express.Router();

	var auth = require('./auth.js');
	var misc = require('./misc.js');
	var user = require('./users.js');
	var appointments = require('./appointments.js');
	var prescriptions = require('./prescriptions.js');

	/*
	 * Routes that can be accessed by any one
	 */
	router.post('/login', auth.login);
	router.post('/register', auth.register);
	router.post('/verifyUsername', auth.verifyUsername);
	router.post('/createContactUs', misc.createContactUs);

	/*
	 * Routes that can be accessed only by authenticated & authorized users
	 */
	//router.get('/api/v1/users', user.getAll);
	router.get('/api/v1/user/:id', user.getOne);
	router.post('/api/v1/user', user.create);
	router.put('/api/v1/user/:id', user.update);
	router.delete('/api/v1/user/:id', user.delete);

	router.get('/api/v1/appointments/:doctor_id', appointments.getDoctorAppointments);
	router.get('/api/v1/appointment/:id', appointments.getOne);
	router.post('/api/v1/appointment', appointments.create);
	router.put('/api/v1/appointment/:id', appointments.update);
	router.delete('/api/v1/appointment/:id', appointments.delete);

	router.get('/api/v1/prescriptions/:doctor_id', prescriptions.getDoctorPrescriptions);
	router.get('/api/v1/prescription/:id', prescriptions.getOne);
	router.post('/api/v1/prescription', prescriptions.create);
	router.put('/api/v1/prescription/:id', prescriptions.update);
	router.delete('/api/v1/prescription/:id', prescriptions.delete);

	module.exports = router;

}());