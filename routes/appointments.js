var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var monk = require('monk');
var db = monk('localhost:27017/dentist');

var collection = db.get('appointments');


// appointments/doctor/id: get appointment by doctor id
router.get('/doctor/:id', function(req, res) {
    collection.find({ "doctorID": req.params.id }, function(err, appointments) {
        res.json(appointments);
    })
});

// appointments/patient/id: get appointment by patient id
router.get('/patient/:id', function(req, res) {
    collection.find({ "patientID": req.params.id }, function(err, appointments) {
        res.json(appointments);
    })
});

// add new appointment: appointments/create
router.post('/create', function(req, res) {
    collection.insert({
        doctorID: req.body.doctorID,
        doctorName: req.body.doctorName,
        facilityID: req.body.facilityID,
        facilityIName: req.body.facilityIName,
        patientID: req.body.patientID,
        patientName: req.body.patientName,
        date: req.body.date,
        time: req.body.time,
        procedure: req.body.procedure,
        status: req.body.status,
    }, function(err, appointment) {
        if (err) throw err
        res.json(appointment);
    })
});

// update appointment: appointments/update/:id
router.post('/update/:id', function(req, res) {
    collection.update({ _id: req.params.id }, {
        $set: {
            date: req.body.date,
            time: req.body.time,
            procedure: req.body.procedure,
            status: req.body.status,
        }
    }, function(err, appointment) {
        if (err) throw err
        res.json(appointment);
    })
});

module.exports = router;