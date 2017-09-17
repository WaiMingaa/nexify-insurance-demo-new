require('dotenv').config({
    silent: true
});
var cloudantUrl = process.env.CLOUDANT_URL; // || '<cloudant_url>';
var logger = require('./../logger/logger');
var nano = require('nano')(cloudantUrl);
module.exports = {
    insertdata: function (db, data) {
        console.log(data);
        nano.db.get(db, function (err) {
            if (err) {
                console.error(err);
                nano.db.create(db, function (err, body) {
                    if (!err) {
                        console.log('database is created!');
                        var dbinstance = nano.use(db);
                        console.log(dbinstance);
                        dbinstance.insert(data, function (err, body) {
                            if (!err) {
                                console.log(body);
                                return body;
                            }
                        });
                    }
                });
            } else {
                var dbinstance = nano.use(db);
                dbinstance.insert({data}, function (err, body) {
                    console.log(err);
                        if (!err) {
                            console.log(body);
                            return body;
                        }
                    }
                );
            }
        });
    }
};
