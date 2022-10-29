var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/medicare');

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

// update a facility facilities/update/:id
router.post('/update/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            services: req.body.services,
            status: req.body.status,
        }
    }, function(err, facility) {
        if (err) throw err
        res.json(facility);
    })
});

// add new facility: facilities/create
router.post('/create', function(req, res) {
    collection.insert({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        services: req.body.services,
        status: req.body.status,
    }, function(err, facility) {
        if (err) throw err
        res.json(facility);
    })
});

module.exports = router;