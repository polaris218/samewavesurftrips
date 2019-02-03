'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Follower Schema
|--------------------------------------------------------------------------
*/
var FollowerSchema = new _mongoose.Schema({

    user_id: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },

    follower_id: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    }

});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
FollowerSchema.plugin(_mongooseTimestamp2.default);
FollowerSchema.plugin(_mongooseStringQuery2.default);

exports.default = _mongoose2.default.model('Follower', FollowerSchema);