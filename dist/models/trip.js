'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _follower = require('./follower');

var _follower2 = _interopRequireDefault(_follower);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Trip Schema
|--------------------------------------------------------------------------
*/
var TripSchema = new _mongoose.Schema({

    owner_id: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },

    owner_details: {
        type: _mongoose.Schema.Types.Mixed,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    departing: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    date_times: {
        departure_date_time: {
            type: Date,
            required: true
        },

        return_date_time: {
            type: Date,
            required: true
        }
    },

    number_of_surfers: {
        type: Number,
        required: false
    },

    gender: {
        type: String,
        lowercase: true,
        required: false
    },

    surf_modality: {
        type: String,
        lowercase: true,
        required: false
    },

    surf_level: {
        type: String,
        lowercase: true,
        required: false
    },

    transport: {
        type: String,
        lowercase: true,
        required: false
    },

    accomodation: {
        type: String,
        lowercase: true,
        required: false
    },

    offering_rides: {
        type: Boolean,
        required: false
    },

    available_seats: {
        type: Number,
        required: false
    },

    trip_details: {
        type: String,
        required: false
    },

    attendees: {
        type: Array,
        required: true
    }

});

/* 
|--------------------------------------------------------------------------
| Join Trip
|--------------------------------------------------------------------------
*/
TripSchema.methods.join = function (attendee) {
    if (this.attendees.indexOf(attendee) != -1) return;

    this.attendees.push(attendee);
    this.save();

    return;
};

/* 
|--------------------------------------------------------------------------
| Leave Trip
|--------------------------------------------------------------------------
*/
TripSchema.methods.leave = function (attendee) {
    if (this.attendees.indexOf(attendee) == -1) return;

    var index = this.attendees.indexOf(attendee);

    this.attendees.splice(index, 1);
    this.save();

    return;
};

/* 
|--------------------------------------------------------------------------
| Pre-save hook
|--------------------------------------------------------------------------
*/
TripSchema.pre('save', function (next) {
    var _this = this;

    if (!this.isNew) {
        next();
    }

    //add owner details to trip -- 
    _user2.default.findOne({ _id: this.owner_id }).then(function (user) {
        var sanitized = user.toObject();
        delete sanitized.password;
        _this.owner_details = sanitized;
        next();
    }).catch(function (err) {
        res.status(422).send(err.errors);
    });
});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
TripSchema.plugin(_mongooseBcrypt2.default);
TripSchema.plugin(_mongooseTimestamp2.default);
TripSchema.plugin(_mongooseStringQuery2.default);

exports.default = _mongoose2.default.model('Trip', TripSchema);