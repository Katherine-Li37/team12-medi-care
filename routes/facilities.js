var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/dentist');

var collection = db.get('facilities');

// facilities/
router.get('/', function(req, res) {
    collection.find({}, function(err, facilities) {
        res.json(facilities);
    })
});

// facilities/id
router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, facility) {
        if (err) throw err
        res.json(facility);
    })
});

// update a facility
router.post('/update/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            // date: req.body.date,
            // time: req.body.time,
            // procedure: req.body.procedure,
            status: req.body.status,
        }
    }, function(err, facility) {
        if (err) throw err
        res.json(facility);
    })
});

module.exports = router;