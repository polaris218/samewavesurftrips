import Trip from '../models/trip';

/* 
|--------------------------------------------------------------------------
| Get Trips
|--------------------------------------------------------------------------
*/
exports.getAll = (req,res) => {

    Trip.find().then(trips => {
		res.json(trips);
	}).catch(err => {
		res.status(422).send(err.errors);
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
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {

	const modelData = Object.assign({}, req.body, { 
       
        owner_id: req.user._id,

		date_times: {
			departure_date_time: req.body.departure_date_time || new Date(),
			return_date_time:  req.body.departure_date_time || new Date()
		}, 

		transport: {
			own_vehicle: req.body.departure_date_time || false,
			offer_rides: req.body.offer_rides || false,
			available_seats: req.body.available_seats || 0,
			bring_own_surfboards: req.body.bring_own_surfboards || false,
			max_surfboards: req.body.max_surfboards || 0,
        }
        
	});

	return modelData;
}


	