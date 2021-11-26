var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    username: String,
    password: String,
    type:{ type: String, default: 'Patient' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipcode: { type: String, default: '' },
    title: { type: String, default: '' },
    services: []
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user);