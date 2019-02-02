
import User from '../models/user';
 
/* 
|--------------------------------------------------------------------------
| Get all users
|--------------------------------------------------------------------------
*/
exports.getAll = (req,res) => {

    User.find().then(users => {
		res.json(users);
	}).catch(err => {
		res.status(422).send(err.errors);
    });
    
}

/* 
|--------------------------------------------------------------------------
| Get user
|--------------------------------------------------------------------------
*/
exports.get = (req,res) => {

    User.find({_id: req.params.id}).then(user => {
		res.json(user);
	}).catch(err => {
		res.status(422).send(err.errors);
    });
    
}

/* 
|--------------------------------------------------------------------------
| Add a user
|--------------------------------------------------------------------------
*/
exports.create = (req,res) => {

    const data = Object.assign({}, req.body) || {};

	User.create(data).then(user => {
		res.json(user);
	}).catch(err => {
		res.status(500).send(err);
	});
    
}

