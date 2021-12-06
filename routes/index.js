var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.post('/register', function(req, res) {
    User.register(new User({ 
        username: req.body.username,
        type: req.body.type,
        firstName: req.body.firstName ? req.body.firstName : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        email: req.body.email,
        phone: req.body.phone ? req.body.phone : null,
        address: req.body.address ? req.body.address : null,
        city: req.body.city ? req.body.city : null,
        state: req.body.state ? req.body.state : null,
        zipcode: req.body.zipcode ? req.body.zipcode : null,
        services: req.body.services ? req.body.services : [],
        title: req.body.title ? req.body.title : null,
        image: req.body.image ? req.body.image : null,
        status: 'active'
    }), req.body.password, function(err, user) {
        if (err) throw err;
        passport.authenticate('local')(req, res, function() {
            res.send({message: 'User Created', user});
        });
    });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            if (!user) {
                res.json({ success: false, message: 'username or password incorrect' })
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.json({ success: false, message: err })
                    } else {
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, 'secret-token', { expiresIn: '24h' });
                        res.json({ 
                            success: true, 
                            message: 'Authentication successful', 
                            token: token, 
                            username: user.username + ',' +  user._id});
                    }
                })
            }
        }
    })(req, res);
});

module.exports = router;