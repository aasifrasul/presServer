(function() {

	"use srict";

	var express = require('express');
	var router = express.Router();

	var auth = require('./auth.js');
	var products = require('./products.js');
	var user = require('./users.js');

	/*
	 * Routes that can be accessed by any one
	 */
	router.post('/login', auth.login);
	router.post('/register', auth.register);
	router.post('/verifyUsername', auth.verifyUsername);

	/*
	 * Routes that can be accessed only by authenticated & authorized users
	 */
	router.get('/api/v1/users', user.getAll);
	router.get('/api/v1/user/:id', user.getOne);
	router.post('/api/v1/user/', user.create);
	router.put('/api/v1/user/:id', user.update);
	router.delete('/api/v1/user/:id', user.delete);

	module.exports = router;

}());