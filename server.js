"use srict";

(function() {

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    //var cookieParser = require('cookie-parser');
    var mongoose = require('mongoose');
    //var passport = require('passport');
    //var flash = require('connect-flash');
    //var fs = require('fs');
    //var http = require('http')
    //var server = http.createServer(app)
    var app = express();

    var configDB = require('./config/database.js');

    mongoose.connect(configDB.url);

    //require('./config/passport')(passport);

    //app.use(cookieParser);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //app.use(express.session({ secret: 'knoldus' })); 
    //app.use(passport.initialize());
    //app.use(passport.session());
    //app.use(flash());

    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Key, X-Requested-With, Content-Type, Accept, x-session-token');
        // Set custom headers for CORS
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    // Auth Middleware - This will check if the token is valid
    // Only the requests that start with /api/v1/* will be checked for the token.
    // Any URL's that do not follow the below pattern should be avoided unless you 
    // are sure that authentication is not needed
    app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

    app.use('/', require('./routes'));
    //require('./app/routes.js')(app, passport,server);

    // If no route is matched by now, it must be a 404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // Start the server
    app.set('port', process.env.PORT || 9000);

    var server = app.listen(app.get('port'), function() {
        console.log('Prescriptions Server running on port ' + app.get('port'));
    });

}());