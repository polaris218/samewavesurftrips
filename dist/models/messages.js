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
| Message Schema
|--------------------------------------------------------------------------
*/
var MessageSchema = new _mongoose.Schema({

    owner_id: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },

    recipient_id: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
MessageSchema.plugin(_mongooseBcrypt2.default);
MessageSchema.plugin(_mongooseTimestamp2.default);
MessageSchema.plugin(_mongooseStringQuery2.default);

exports.default = _mongoose2.default.model('Message', MessageSchema);