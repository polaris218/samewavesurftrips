
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

    User.findOne({_id: req.params.id}).then(user => {
		user.followers();
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

/* 
|--------------------------------------------------------------------------
| Follow a user
|--------------------------------------------------------------------------
*/
exports.follow = (req,res) => {

	console.log(req.user)
	res.status(200);

	// User.findOne({_id: req.params.id}).then(user => {
	// 	user.follow(req.user._id);
	// }).catch(err => {
	// 	res.status(422).send(err.errors);
    // });
    
}

/* 
|--------------------------------------------------------------------------
| Unfollow a user
|--------------------------------------------------------------------------
*/
exports.unfollow = (req,res) => {

	User.findOne({_id: req.params.id}).then(user => {
		user.unfollow(req.user._id);
	}).catch(err => {
		res.status(422).send(err.errors);
    });
    
}

