'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

var _notifications = require('../controllers/notifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.set('useCreateIndex', true);

var UserSchema = exports.UserSchema = new _mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        bcrypt: true
    },

    gender: {
        type: String,
        required: false
    }

});

UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
    }

    (0, _notifications.notify_newUser)(this);
    next();
});

UserSchema.plugin(_mongooseBcrypt2.default);
UserSchema.plugin(_mongooseTimestamp2.default);
UserSchema.plugin(_mongooseStringQuery2.default);
UserSchema.index({ email: 1 });

module.exports = exports = _mongoose2.default.model('User', UserSchema);