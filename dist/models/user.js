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
    var _this = this;

    return new Promise(function (resolve, reject) {

        _follower2.default.create({ user_id: _this._id, follower_id: follower_id }).then(function (follower) {
            resolve(follower);
        }).catch(function (err) {
            reject(err);
        });
    });
};

/* 
|--------------------------------------------------------------------------
| Unfollow user
|--------------------------------------------------------------------------
*/
UserSchema.methods.unfollow = function (follower_id) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {

        _follower2.default.findOneAndDelete({ user_id: _this2._id, follower_id: follower_id }, function (err, follower) {
            if (!err) resolve();else reject(err);
        });
    });
};

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
UserSchema.methods.followers = function () {
    var _this3 = this;

    return new Promise(function (resolve, reject) {

        _follower2.default.find({ user_id: _this3._id }).then(function (followers) {
            resolve(followers);
        }).catch(function (err) {
            reject(err);
        });
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