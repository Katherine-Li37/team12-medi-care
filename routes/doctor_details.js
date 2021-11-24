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


module.exports = router;