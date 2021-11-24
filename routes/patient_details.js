var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/dentist');

var collection = db.get('patient_details');


// patient_details/id
router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, userDetail) {
        if (err) throw err
        res.json(userDetail);
    })
});


module.exports = router;