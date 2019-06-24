'use strict';

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

var _trip = require('../models/trip');

var _trip2 = _interopRequireDefault(_trip);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Get Messages
|--------------------------------------------------------------------------
*/
exports.getAll = function (req, res) {

	_message2.default.find({ recipient_id: req.user._id }).then(function (message) {
		res.json(message);
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
		res.json(message);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Group Message
|--------------------------------------------------------------------------
*/
exports.messageTripAttendees = function (req, res) {

	_trip2.default.findOne({ _id: req.params.tripId }).then(function (trip) {

		trip.attendees.forEach(function (user) {

			var modelData = Object.assign({}, req.body, {
				owner_id: req.user._id,
				recipient_id: _mongoose2.default.Types.ObjectId(user)
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

	_message2.default.remove({ _id: req.params.id, recipient_id: req.user._id }).then(function (message) {
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

		owner_id: req.user._id,
		recipient_id: _mongoose2.default.Types.ObjectId(req.body.recipient_id)

	});

	return modelData;
}