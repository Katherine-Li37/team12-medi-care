var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var app = express();
var User = require('./models/user');

//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('Mongoose is connected');
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3006', // <-- location of the react app were connecting to
        credentials: true,
    })
);

app.use(session({ secret: 'this-is-a-secret-token' }));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var doctorDetailsRouter = require('./routes/doctor_details');
var clinicsRouter = require('./routes/clinics');
var appointmentsRouter = require('./routes/appointments');

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/doctor_details', doctorDetailsRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);


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
    res.status(err.status || 500).json(err);
});

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

module.exports = app;