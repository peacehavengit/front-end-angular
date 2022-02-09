var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true
    },
    mname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: [true, 'this email is  already registred']
    },
    gender: {
        type: String,
        trim: true,
    },
    dob: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    postal: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    tfa_status: {
        type: Boolean,
        default: false
    },
    phone_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    one_time_password: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});


var Users = mongoose.model('Users', UserSchema);
module.exports = Users;