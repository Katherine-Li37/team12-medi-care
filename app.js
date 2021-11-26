var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var app = express();
var User = require("./models/user");

//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect('mongodb://localhost:27017/dentist', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose is connected");
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3006", // <-- location of the react app were connecting to
        credentials: true,
    })
);
// app.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//     })
// );
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./passportConfig")(passport);

app.use(session({ secret: 'this-is-a-secret-token' }));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientDetailsRouter = require('./routes/patient_details');
var doctorDetailsRouter = require('./routes/doctor_details');
var facilitiesRouter = require('./routes/facilities');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors({
//     'allowedHeaders': ['Content-Type'],
//     'origin': '*',
//     'preflightContinue': true
// }));

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