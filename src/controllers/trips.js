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

    const data = Object.assign({}, req.body) || {};

    Trip.create(data).then(trip => {
		res.json(trip);
	}).catch(err => {
		res.status(500).send(err);
	});
}


	