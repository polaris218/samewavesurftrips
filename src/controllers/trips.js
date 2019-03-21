import Trip from '../models/trip';

/* 
|--------------------------------------------------------------------------
| Convert GEOCODE
|--------------------------------------------------------------------------
*/
exports.geocode = (req,res) => {

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
	
}

/* 
|--------------------------------------------------------------------------
| Get Trips
|--------------------------------------------------------------------------
*/
exports.getAll = (req,res) => {

    Trip.find().then(trips => {
			res.json(trips);
		}).catch(err => {
			res.status(422).send(err);
		});
    
}

/* 
|--------------------------------------------------------------------------
| Get Trips by userID
|--------------------------------------------------------------------------
*/
exports.getUserTrips = (req,res) => {

	Trip.find({owner_id: req.params.userid}).then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err);
	});

}
 
/* 
|--------------------------------------------------------------------------
| Create Trip
|--------------------------------------------------------------------------
*/
exports.create = (req,res) => {

	const modelData = setDefaultValues(req);
    Trip.create(modelData).then(trip => {
		res.json(trip);
	}).catch(err => {
		res.status(500).send(err);
	});
}

/* 
|--------------------------------------------------------------------------
| Update Trip
|--------------------------------------------------------------------------
*/
exports.update = (req,res) => {

	const modelData = setDefaultValues(req);
	
	Trip.findOneAndUpdate({_id: req.params.id, owner_id:req.user._id}, modelData,{new: true}).then(trip => {
		res.json(trip)
	}).catch(err => {
		res.status(500).send(err);
	})

}

/* 
|--------------------------------------------------------------------------
| Delete Trip
|--------------------------------------------------------------------------
*/
exports.delete = (req,res) => {

	Trip.remove({_id: req.params.id, owner_id: req.user._id}).then(trip => {
		res.json(trip);
	}).catch(err => {
		res.status(500).send(err);
	});

}

/* 
|--------------------------------------------------------------------------
| Join Trip
|--------------------------------------------------------------------------
*/
exports.join = (req,res) => {

	Trip.findOne({_id: req.params.id}).then(trip => {
		trip.join(req.user._id);
		res.json(trip);
		
	}).catch(err => {
		res.status(422).send(err);
	});

}

/* 
|--------------------------------------------------------------------------
| Leave Trip
|--------------------------------------------------------------------------
*/
exports.leave = (req,res) => {

	Trip.findOne({_id: req.params.id}).then(trip => {
		trip.leave(req.user._id);
		res.json(trip);
		
	}).catch(err => {
		res.status(422).send(err);
	});

}

/* 
|--------------------------------------------------------------------------
| Search trips
|--------------------------------------------------------------------------
*/
exports.search = (req,res) => {
	
	const skip = parseInt(req.query.skip) || 0;
	var query = {};

	//search title ---
	req.query['title'] != undefined ? query['title'] = new RegExp(`.*${req.query['title']}.*`,"i") : undefined;

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
	req.query['number_of_surfers'] != undefined ? query['number_of_surfers'] = { $lte: req.query['number_of_surfers'] }  : undefined;


	Trip.find( query ).skip(skip).limit(50).then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err);
	})

}


/* 
|--------------------------------------------------------------------------
| Search trips
|--------------------------------------------------------------------------
*/
exports.searchDestination = (req,res) => {
	
	const skip = parseInt(req.query.skip) || 0;
	var query = {};

	let lng = req.query.lng || 0, 
			lat = req.query.lat || 0,
			radius = req.query.radius || 10;

	var milesToRadian = function(miles){
			var earthRadiusInMiles = 3959;
			return miles / earthRadiusInMiles;
	};

	var query = {
    "destination_loc" : {
        $geoWithin : {
            $centerSphere : [[lng,lat], milesToRadian(radius) ]
        }
    }
	};

	Trip.find(query).skip(skip).limit(50).then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err);
	});


}

/* 
|--------------------------------------------------------------------------
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {

	let departingLng = req.body.departing.lng || 0,
			departingLat = req.body.departing.lat || 0,
			destinationLng = req.body.destination.lng || 0,
			destinationLat = req.body.destination.lat || 0;

	const modelData = Object.assign({}, req.body, { 
       
				owner_id: req.user._id,
				owner_details: {}, //the model will populate this
				attendees: [],

				departing_loc: {
					type: "Point",
					coordinates: [departingLng, departingLat]
				},

				destination_loc: {
					type: "Point",
					coordinates: [destinationLng, destinationLat]
				},

				date_times: {
					departure_date_time: req.body.departure_date_time || new Date(),
					return_date_time:  req.body.departure_date_time || new Date()
				}
        
	});

	return modelData;
}


	