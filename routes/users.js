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
    collection.find({ "type": "Doctor" }, function(err, doctors) {
        res.json(doctors);
    })
});

// user/id
router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, user) {
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

// // delete an existing video
// router.delete('/:id', function(req, res) {
//     collection.remove({ _id: req.params.id }, function(err, video) {
//         if (err) throw err
//         res.json(video);
//     })
// });
module.exports = router;