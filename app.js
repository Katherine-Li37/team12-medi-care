var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientDetailsRouter = require('./routes/patient_details');
var doctorDetailsRouter = require('./routes/doctor_details');
var facilitiesRouter = require('./routes/facilities');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
  }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patient_details', patientDetailsRouter);
app.use('/doctor_details', doctorDetailsRouter);
app.use('/facilities', facilitiesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;