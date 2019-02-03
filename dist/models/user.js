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

var _notifications = require('../controllers/notifications');

var _follower = require('./follower');

var _follower2 = _interopRequireDefault(_follower);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.set('useCreateIndex', true);

/* 
|--------------------------------------------------------------------------
| User Schema
|--------------------------------------------------------------------------
*/
var UserSchema = new _mongoose.Schema({

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

/* 
|--------------------------------------------------------------------------
| Follow user
|--------------------------------------------------------------------------
*/
UserSchema.methods.follow = function (follower_id) {

    Follow.create({ user_id: this._id, follower_id: follower_id }).then(function (follower) {
        console.log(follower);
    }).catch(function (err) {
        res.status(500).send(err);
    });
};

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
UserSchema.methods.followers = function () {

    _follower2.default.find({ user_id: this._id }).then(function (followers) {
        console.log(followers, '... followers');
    }).catch(function (err) {
        res.status(422).send(err.errors);
    });
};

/* 
|--------------------------------------------------------------------------
| Pre-save hook
|--------------------------------------------------------------------------
*/
UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
    }

    (0, _notifications.notify_newUser)(this);
    next();
});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
UserSchema.plugin(_mongooseBcrypt2.default);
UserSchema.plugin(_mongooseTimestamp2.default);
UserSchema.plugin(_mongooseStringQuery2.default);

/* 
|--------------------------------------------------------------------------
| Set indexes
|--------------------------------------------------------------------------
*/
UserSchema.index({ email: 1 });

exports.default = _mongoose2.default.model('User', UserSchema);