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
		res.status(422).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Get Trips by userID
|--------------------------------------------------------------------------
*/
exports.getUserTrips = function (req, res) {

	_trip2.default.find({ owner_id: req.params.userid }).then(function (trips) {
		res.json(trips);
	}).catch(function (err) {
		res.status(422).send(err);
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
| Delete Trip
|--------------------------------------------------------------------------
*/
exports.delete = function (req, res) {

	_trip2.default.remove({ _id: req.params.id, owner_id: req.user._id }).then(function (trip) {
		res.json(trip);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Join Trip
|--------------------------------------------------------------------------
*/
exports.join = function (req, res) {

	_trip2.default.findOne({ _id: req.params.id }).then(function (trip) {
		trip.join(req.user._id);
		res.json(trip);
	}).catch(function (err) {
		res.status(422).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Leave Trip
|--------------------------------------------------------------------------
*/
exports.leave = function (req, res) {

	_trip2.default.findOne({ _id: req.params.id }).then(function (trip) {
		trip.leave(req.user._id);
		res.json(trip);
	}).catch(function (err) {
		res.status(422).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Search trips
|--------------------------------------------------------------------------
*/
exports.search = function (req, res) {

	var skip = parseInt(req.query.skip) || 0;
	var query = {};

	//search title ---
	req.query['title'] != undefined ? query['title'] = new RegExp('.*' + req.query['title'] + '.*', "i") : undefined;

	//search gender ---
	req.query['gender'] != undefined ? query['gender'] = req.query['gender'] : undefined;

	//search surf modality ---
	req.query['surf_modality'] != undefined ? query['surf_modality'] = req.query['surf_modality'] : undefined;

	//search surf level ---
	req.query['surf_level'] != undefined ? query['surf_level'] = req.query['surf_level'] : undefined;

	//search transport ---
	req.query['transport'] != undefined ? query['transport'] = req.query['transport'] : undefined;

	//search accomodation ---
	req.query['accomodation'] != undefined ? query['accomodation'] = req.query['accomodation'] : undefined;

	//search max no. surfers ---
	req.query['number_of_surfers'] != undefined ? query['number_of_surfers'] = { $lte: req.query['number_of_surfers'] } : undefined;

	_trip2.default.find(query).skip(skip).limit(50).then(function (trips) {
		res.json(trips);
	}).catch(function (err) {
		res.status(422).send(err);
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
		owner_details: {}, //the model will populate this
		attendees: [],

		date_times: {
			departure_date_time: req.body.departure_date_time || new Date(),
			return_date_time: req.body.departure_date_time || new Date()
		}

	});

	return modelData;
}