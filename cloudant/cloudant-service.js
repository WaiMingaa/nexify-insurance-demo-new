require('dotenv').config({
    silent: true
});
var cloudantUrl = process.env.CLOUDANT_URL; // || '<cloudant_url>';
var logger = require('./../logger/logger');
var nano = require('nano')(cloudantUrl);
module.exports = {
    insertdata: function (db, data, res) {
        nano.db.get(db, function (err) {
            if (err) {
                logger.error(err);
                nano.db.create(db, function (err, body) {
                    if (!err) {
                        logger.log('database is created!');
                        nano.db.use(db).insert(data, data.title, function (err, body) {
                            if (!err) {
                                logger.log(body);
                                res.send(body);
                            }
                        });
                    }
                });
            } else
                nano.db.use(db).insert(data, data.title, function (err, body) {
                    if (!err) {
                        logger.log(body);
                        res.send(body);
                    }
                });

        });
    }
};
