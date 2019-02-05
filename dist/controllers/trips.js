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

	var modelData = setDefaultValues(req);

	_trip2.default.create(modelData).then(function (trip) {
		res.json(trip);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Update Trip
|--------------------------------------------------------------------------
*/
exports.update = function (req, res) {

	var modelData = setDefaultValues(req);

	_trip2.default.findOneAndUpdate({ _id: req.params.id, owner_id: req.user._id }, modelData, { new: true }).then(function (trip) {
		res.json(trip);
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

		date_times: {
			departure_date_time: req.body.departure_date_time || new Date(),
			return_date_time: req.body.departure_date_time || new Date()
		},

		transport: {
			own_vehicle: req.body.departure_date_time || false,
			offer_rides: req.body.offer_rides || false,
			available_seats: req.body.available_seats || 0,
			bring_own_surfboards: req.body.bring_own_surfboards || false,
			max_surfboards: req.body.max_surfboards || 0
		}

	});

	return modelData;
}