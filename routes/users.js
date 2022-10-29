var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/medicare');

var collection = db.get('users');

// users/
router.get('/', function(req, res) {
    collection.find({}, function(err, users) {
        res.json(users);
    })
});


// users/doctors
router.get('/doctors', function(req, res) {
    collection.find({ 'type': 'Doctor' }, function(err, doctors) {
        res.json(doctors);
    })
});

// users/register/email/:id for new user register checking on email
router.get('/register/email/:id', function(req, res) {
    collection.find({ 'username': req.params.id }, function(err, user) {
        if (err) throw err
        res.json(user);
    })
});
router.get('/register/phone/:id', function(req, res) {
    collection.find({ 'phone': req.params.id }, function(err, user) {
        if (err) throw err
        res.json(user);
    })
});
// users/id
router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, user) {
        if (err) throw err
        res.json(user);
    })
});

// update a user
router.post('/update/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            status: req.body.status,
            title: req.body.title,
            services: req.body.services,
        }
    }, function(err, user) {
        if (err) throw err
        res.json(user);
    })
});

// upload image to user with user id
router.post('/imageUpload/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            image: req.body.image,
        }
    }, function(err, user) {
        if (err) throw err
        res.json(user);
    })
});

module.exports = router;