'use strict';

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

var _trip = require('../models/trip');

var _trip2 = _interopRequireDefault(_trip);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* 
|--------------------------------------------------------------------------
| Get Messages
|--------------------------------------------------------------------------
*/
exports.getAll = function (req, res) {
  _message2.default.find({
    recipient_id: req.user._id
  }).then(function (message) {
    // res.json(message)
    _message2.default.find({
      owner_id: req.user._id
    }).then(function (ownMessage) {
      var allMsgs = [].concat(_toConsumableArray(ownMessage), _toConsumableArray(message));
      res.json(allMsgs);
    }).catch(function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Create Message
|--------------------------------------------------------------------------
*/
exports.create = function (req, res) {
  var modelData = setDefaultValues(req);

  _message2.default.create(modelData).then(function (message) {
    _message2.default.updateMany({
      "msg_read": false,
      "recipient_id": message.owner_id,
      "owner_id": message.recipient_id
    }, {
      $set: {
        "msg_read": true
      }
    }, {
      upsert: false,
      multi: true
    }, function (err, res1) {});
    res.json(message);
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Update Message Status
|--------------------------------------------------------------------------
*/
exports.update = function (req, res) {
  if (req.body.subject != 'undefined' && req.body.recipient_id != 'undefined' && req.body.owner_id != 'undefined' && req.body.msg_read != 'undefined') {
    _message2.default.updateMany({
      "msg_read": false,
      "subject": req.body.subject,
      "recipient_id": _mongoose2.default.Types.ObjectId(req.body.recipient_id),
      "owner_id": _mongoose2.default.Types.ObjectId(req.body.owner_id) }, { $set: { "msg_read": true } }, { upsert: false, multi: true }).then(function (data) {
      return res.status(200).json({ "message": "ok" });
    }).catch(function (err) {
      return res.status(500).send(err);
    });
  }
};

/* 
|--------------------------------------------------------------------------
| Group Message
|--------------------------------------------------------------------------
*/
exports.messageTripAttendees = function (req, res) {
  _trip2.default.findOne({
    _id: req.params.tripId
  }).then(function (trip) {
    trip.attendees.forEach(function (user) {
      var modelData = Object.assign({}, req.body, {
        owner_id: req.user._id,
        recipient_id: _mongoose2.default.Types.ObjectId(user),
        trip_id: req.params.tripId
      });

      _message2.default.create(modelData);
    });
  });
};

/* 
|--------------------------------------------------------------------------
| Delete Message
|--------------------------------------------------------------------------
*/
exports.delete = function (req, res) {
  _message2.default.remove({
    _id: req.params.id,
    recipient_id: req.user._id
  }).then(function (message) {
    res.json(message);
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {
  var modelData = Object.assign({}, req.body, {
    owner_id: _mongoose2.default.Types.ObjectId(req.body.owner_id) || req.user._id,
    recipient_id: _mongoose2.default.Types.ObjectId(req.body.recipient_id)
  });
  return modelData;
}