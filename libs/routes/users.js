var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var User = require(libs + 'model/user');
var Client = require(libs + 'model/client');
var db = require(libs + 'db/mongoose');

router.get('/info', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`. It is typically used to indicate scope of the token,
        // and used in access control checks. For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope
        });
    }
);

// Create user
router.post('/signup', function (req, res) {

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    var client = new Client({
        name: req.body.name,
        clientId: req.body.clientId,
        clientSecret: req.body.clientSecret
    });

    user.save(function (err) {
        if (!err) {
            log.info('New User created with id: %s', user.id);
            return res.json({
                status: 'OK',
                user: user
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
    client.save(function (err, client) {

        if (!err) {
            log.info('New client - %s:%s', client.clientId, client.clientSecret);
        } else {
            return log.error(err);
        }

    });
    
});

module.exports = router;
