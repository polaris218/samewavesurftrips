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
        required: false
    },

    surf_modality: {
        type: String,
        required: false
    },

    surf_level: {
        type: String,
        required: false
    },

    transport: {
        own_vehicle: {
            type: String,
            required: false
        },

        offer_rides: {
            type: Boolean,
            required: false
        },

        available_seats: {
            type: Number,
            required: false
        },

        bring_own_surfboards: {
            type: Boolean,
            required: false
        },

        max_surfboards: {
            type: Number,
            required: false
        }
    },

    accomodation: {
        name: {
            type: String,
            required: false
        },

        location: {
            type: String,
            required: false
        }
    }
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