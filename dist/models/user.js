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

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

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

    username: {
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
    },

    bio: {
        type: String,
        required: false
    },

    avatar: {
        type: String,
        required: false
    },

    cover_image: {
        type: String,
        required: false
    },

    location: {
        type: { type: String },
        coordinates: []
    },

    surf_level: {
        type: String,
        required: false
    },

    surf_modality: {
        type: String,
        required: false
    },

    stance: {
        type: String,
        required: false
    },

    interests: {
        type: _mongoose.Schema.Types.Mixed,
        required: false
    },

    surfing_since: {
        type: Date,
        required: false
    },

    optIn: {
        type: Boolean,
        required: false,
        default: false
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
| Get avatar
|--------------------------------------------------------------------------
*/
UserSchema.methods.getAvatar = function (res) {

    //create spaces instance ---
    var s3 = new _awsSdk2.default.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    var s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: this.avatar
    };

    res.attachment(this.avatar);
    var fileStream = s3.getObject(s3Params).createReadStream();
    fileStream.pipe(res);
};

/* 
|--------------------------------------------------------------------------
| Update avatar
|--------------------------------------------------------------------------
*/
UserSchema.methods.updateAvatar = function (file) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {

        var ext = void 0,
            unique = void 0,
            oldfile = void 0;

        if (!file) {
            reject();
        }

        oldfile = _this4.avatar;
        ext = file.name.substring(file.name.indexOf('.'));
        unique = _nodeUuid2.default.v4() + ext;

        var spacesEndpoint = new _awsSdk2.default.Endpoint(process.env.DO_ENDPOINT);
        var fileType = file.type;

        //create spaces instance ---
        var s3 = new _awsSdk2.default.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        //spaces options ---
        var s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: unique,
            Expires: 60,
            ContentType: fileType,
            ContentDisposition: 'inline',
            ACL: 'public-read',
            Body: file.data
        };

        //upload to spaces ---
        s3.upload(s3Params, function (s3Err, data) {
            if (s3Err) throw s3Err;
            console.log('File uploaded successfully at ' + data.Location);

            _this4.avatar = unique;
            _this4.save();

            //delete the old avatar ---
            if (oldfile) {
                try {

                    s3.deleteObject({
                        Bucket: process.env.S3_BUCKET,
                        Key: oldfile
                    }, function (err, data) {
                        if (err) console.log(err, err.stack);
                    });
                } catch (e) {
                    console.log(e);
                }
            }

            resolve(unique);
        });
    });
};

/* 
|--------------------------------------------------------------------------
| Update Cover
|--------------------------------------------------------------------------
*/
UserSchema.methods.updateCover = function (file) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {

        var ext = void 0,
            unique = void 0,
            oldfile = void 0;

        if (!file) {
            reject();
        }

        oldfile = _this5.cover_image;

        ext = file.name.substring(file.name.indexOf('.'));
        unique = _nodeUuid2.default.v4() + ext;

        var spacesEndpoint = new _awsSdk2.default.Endpoint(process.env.DO_ENDPOINT);
        var fileType = file.type;

        //create spaces instance ---
        var s3 = new _awsSdk2.default.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        //spaces options ---
        var s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: unique,
            Expires: 60,
            ContentType: fileType,
            ContentDisposition: 'inline',
            ACL: 'public-read',
            Body: file.data
        };

        //upload to spaces ---
        s3.upload(s3Params, function (s3Err, data) {
            if (s3Err) throw s3Err;
            console.log('File uploaded successfully at ' + data.Location);

            _this5.cover_image = unique;
            _this5.save();

            //delete the old avatar ---
            if (oldfile) {
                try {

                    s3.deleteObject({
                        Bucket: process.env.S3_BUCKET,
                        Key: oldfile
                    }, function (err, data) {
                        if (err) console.log(err, err.stack);
                    });
                } catch (e) {
                    console.log(e);
                }
            }

            resolve(unique);
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
    } else {
        (0, _notifications.notify_newUser)(this);
        next();
    }
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
UserSchema.index({ email: 1, username: 1 });

exports.default = _mongoose2.default.model('User', UserSchema);