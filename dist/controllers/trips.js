'use strict';

var _trip = require('../models/trip');

var _trip2 = _interopRequireDefault(_trip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* 
|--------------------------------------------------------------------------
| Convert GEOCODE
|--------------------------------------------------------------------------
*/
exports.geocode = function (req, res) {}
// function IsValidJSONString(str) {
// 		try {
// 				JSON.parse(str);
// 		} catch (e) {
// 				return false;
// 		}
// 		return true;
// }
// Trip.find().then(trips => {
// 	trips.forEach(function (doc) {
// 		let departure = IsValidJSONString(doc.departing)  ? JSON.parse(doc.departing) : {lng:0,lat:0},
// 				destination = IsValidJSONString(doc.destination) ? JSON.parse(doc.destination) : {lng:0,lat:0};
// 		Trip.updateOne({_id: doc._id}, {
// 			destination_loc :{
// 				type : "Point",
// 				coordinates : [destination.lng, destination.lat]
// 			},
// 			departing_loc : {
// 				type : "Point",
// 				coordinates : [departure.lng, departure.lat]
// 			}
// 		}, function (err, doc){
// 			console.log(err)
// 		});
// 		res.status(200);
// 	});
// }).catch(err => {
// 	res.status(422).send(err);
// });


/* 
|--------------------------------------------------------------------------
| Get Trips
|--------------------------------------------------------------------------
*/
;exports.getAll = function (req, res) {
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
  _trip2.default.find({
    // owner_id: req.params.userid,
    attendees: {
      $in: [req.params.userid]
    }
  }).then(function (trips) {
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

  _trip2.default.findOneAndUpdate({
    _id: req.params.id,
    owner_id: req.user._id
  }, modelData, {
    new: true
  }).then(function (trip) {
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
  _trip2.default.remove({
    _id: req.params.id,
    owner_id: req.user._id
  }).then(function (trip) {
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
  _trip2.default.findOne({
    _id: req.params.id
  }).then(function (trip) {
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
  _trip2.default.findOne({
    _id: req.params.id
  }).then(function (trip) {
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
  console.log("req.query", req.query);
  var lng = req.query['lng'] || 0,
      lat = req.query['lat'] || 0,
      radius = req.query['radius'] || 20;

  var d_lng = req.query['d_lng'] || 0,
      d_lat = req.query['d_lat'] || 0,
      d_radius = req.query['d_radius'] || 20;

  if (req.query.d_lat) {
    query['departing_loc'] = {
      $geoWithin: {
        $centerSphere: [[d_lng, d_lat], d_radius / 3963.2]
      }
    };
  }

  if (req.query.lat) {
    query['destination_loc'] = {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 3963.2]
      }
    };
  }

  var lteDate1 = new Date(req.query['departure_date_time']);
  lteDate1.setDate(lteDate1.getDate() + 1);
  // search departure_date_time ---
  req.query['departure_date_time'] != undefined || '' ? query['date_times.departure_date_time'] = {
    "$gte": new Date(req.query['departure_date_time'])
  } : undefined;

  //search return_date_time ---
  req.query['return_date_time'] != undefined || '' ? query['date_times.return_date_time'] = {
    "$lte": new Date(req.query['return_date_time']).setHours(23, 59, 59, 0)
  } : undefined;

  if (!req.query['return_date_time']) {
    query['date_times.return_date_time'] = {
      "$gte": new Date().setHours(23, 59, 59, 0)
    };
  }

  //search title ---
  req.query['title'] != undefined ? query['title'] = new RegExp('.*' + req.query['title'] + '.*', 'i') : undefined;

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
  req.query['number_of_surfers'] != undefined ? query['number_of_surfers'] = {
    $lte: req.query['number_of_surfers']
  } : undefined;
  console.log("final query ", JSON.stringify(query));
  _trip2.default.find(query).skip(skip).limit(50).then(function (trips) {
    res.json(trips);
  }).catch(function (err) {
    console.log("err=", err);
    res.status(422).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Search trips
|--------------------------------------------------------------------------
*/
exports.searchDestination = function (req, res) {
  var skip = parseInt(req.query.skip) || 0;
  var query = {};

  var lng = req.query.lng || 0,
      lat = req.query.lat || 0,
      radius = req.query.radius || 20;

  var milesToRadian = function milesToRadian(miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
  };

  var query = {
    destination_loc: {
      $geoWithin: {
        $centerSphere: [[lng, lat], milesToRadian(radius)]
      }
    }

    //search gender ---
  };req.query['gender'] != undefined ? query['gender'] = req.query['gender'] : undefined;

  //search surf modality ---
  req.query['surf_modality'] != undefined ? query['surf_modality'] = req.query['surf_modality'] : undefined;

  //search surf level ---
  req.query['surf_level'] != undefined ? query['surf_level'] = req.query['surf_level'] : undefined;

  //search transport ---
  req.query['transport'] != undefined ? query['transport'] = req.query['transport'] : undefined;

  //search accomodation ---
  req.query['accomodation'] != undefined ? query['accomodation'] = req.query['accomodation'] : undefined;

  //search max no. surfers ---
  req.query['number_of_surfers'] != undefined ? query['number_of_surfers'] = {
    $lte: req.query['number_of_surfers']
  } : undefined;

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

  var departingLng = JSON.parse(req.body.departing).lng || 0,
      departingLat = JSON.parse(req.body.departing).lat || 0,
      destinationLng = JSON.parse(req.body.destination).lng || 0,
      destinationLat = JSON.parse(req.body.destination).lat || 0;

  var modelData = Object.assign({}, req.body, {
    owner_id: req.user._id,
    owner_details: {}, //the model will populate this
    attendees: [].concat(_toConsumableArray(req.body.attendees)),

    departing_loc: {
      type: 'Point',
      coordinates: [departingLng, departingLat]
    },

    destination_loc: {
      type: 'Point',
      coordinates: [destinationLng, destinationLat]
    },

    date_times: {
      departure_date_time: req.body.departure_date_time || new Date(),
      return_date_time: req.body.return_date_time || new Date()
    }
  });

  return modelData;
}