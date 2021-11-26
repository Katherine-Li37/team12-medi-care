var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var jwt = require("jsonwebtoken");

router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

// router.get('/register', function(req, res) {
//     res.render('register', {});
// });

// router.post("/register", (req, res) => {
//     console.log(req.body);
//     User.findOne({ username: req.body.username }, async(err, doc) => {
//         if (err) throw err;
//         if (doc) res.send("User Already Exists");
//         if (!doc) {
//             const newUser = new User({
//                 username: req.body.username,
//                 password: req.body.password,
//             });
//             await newUser.save();
//             res.send("User Created");
//         }
//     });
// });

router.post('/register', function(req, res) {
    console.log(req.body);
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            throw err;
        }

        passport.authenticate('local')(req, res, function() {
            res.send("User Created");
        });
    });
});


// router.get('/login', function(req, res) {
//     res.render('login');
// });

router.post("/login", (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        // console.log(user)
        // console.log(info)
        if (err) {
            res.json({ success: false, message: err })
        } else {
            if (!user) {
                res.json({ success: false, message: 'username or password incorrect' })
            } else {
                req.login(user, function(err) {
                    if (err) {
                        console.log(err)
                        res.json({ success: false, message: err })
                    } else {
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, 'this-is-a-secret-token', { expiresIn: '24h' })
                        res.json({ success: true, message: "Authentication successful", token: token });
                    }
                })
            }
        }
    })(req, res);
});

router.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;