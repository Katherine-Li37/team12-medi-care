var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    username: String,
    password: String,
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    status: { type: String, default: 'active' },
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user);