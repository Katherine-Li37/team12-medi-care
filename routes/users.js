var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/dentist');

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

// users/register/:id for new user register checking
router.get('/register/:id', function(req, res) {
    // console.log('username', req.params.id)
    collection.find({ 'username': req.params.id }, function(err, user) {
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

// // add new video
// router.post('/', function(req, res) {
//     collection.insert({
//         title: req.body.title,
//         genre: req.body.genre,
//         description: req.body.desc,
//     }, function(err, video) {
//         if (err) throw err
//         res.json(video);
//     })
// });

// // update an existing video
// router.post('/:id', function(req, res) {
//     collection.update({ _id: req.params.id }, {
//         $set: {
//             title: req.body.title,
//             genre: req.body.genre,
//             description: req.body.desc,
//         }
//     }, function(err, video) {
//         if (err) throw err
//         res.json(video);
//     })
// });

module.exports = router;