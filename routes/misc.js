(function() {

    "use srict";

    var Contactus = require('../models/contactus');

    var factory = {

        createContactUs: function(req, res) {
            data = req.body;
            data.created_on = Date.now();
            console.log(data);
            var contactus = new Contactus(data);
            contactus.save(function(err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else if (result) {
                    res.json({
                        "status": 200,
                        "message": "Contact Us Created",
                        "misc": result
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
            console.log(data);

            Misc.findByIdAndUpdate(req.params.id, data, [],
                function(err, misc) {
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
                        "message": "Misc Updated",
                        "misc": misc
                    });
                    return;
                });
        },

        delete: function(req, res) {
            Misc.remove({
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
                        "message": "Misc Deleted"
                    });
                    return;
                });
        }
    };

    module.exports = factory;

}());