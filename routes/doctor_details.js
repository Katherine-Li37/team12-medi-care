var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var monk = require('monk');
var db = monk('localhost:27017/dentist');

var collection = db.get('doctor_details');


// doctor_details/id
router.get('/:id', function(req, res) {
    collection.findOne({"userID": mongoose.Types.ObjectId(req.params.id)}, function(err, userDetail) {
        if (err) throw err
        res.json(userDetail);
    })
});

// doctor_details/create
router.post('/create', function(req, res) {
    collection.insert({
        userID: mongoose.Types.ObjectId(req.body.userID),
        facilities: {
            facilityID: mongoose.Types.ObjectId(req.body.facilityID),
            facilityName: req.body.facilityName,
            availability: {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: []
            }
        }
    }, function(err, facility) {
        if (err) throw err
        res.json(facility);
    })
});


module.exports = router;