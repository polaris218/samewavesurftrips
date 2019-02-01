'use strict';

var _trip = require('../models/trip');

var _trip2 = _interopRequireDefault(_trip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Get Trips
|--------------------------------------------------------------------------
*/
exports.getAll = function (req, res) {

	_trip2.default.find().then(function (trips) {
		res.json(trips);
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});
};

/* 
|--------------------------------------------------------------------------
| Create Trip
|--------------------------------------------------------------------------
*/
exports.create = function (req, res) {

	var data = Object.assign({}, req.body) || {};

	_trip2.default.create(data).then(function (trip) {
		res.json(trip);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};