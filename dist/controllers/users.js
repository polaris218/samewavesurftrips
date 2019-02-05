'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Get all users
|--------------------------------------------------------------------------
*/
exports.getAll = function (req, res) {

	_user2.default.find().then(function (users) {
		res.json(users);
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});
};

/* 
|--------------------------------------------------------------------------
| Get user
|--------------------------------------------------------------------------
*/
exports.get = function (req, res) {

	_user2.default.findOne({ _id: req.params.id }).then(function (user) {
		res.json(user);
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});
};

/* 
|--------------------------------------------------------------------------
| Add a user
|--------------------------------------------------------------------------
*/
exports.create = function (req, res) {

	var data = Object.assign({}, req.body) || {};

	_user2.default.create(data).then(function (user) {
		res.json(user);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Update user
|--------------------------------------------------------------------------
*/
exports.update = function (req, res) {

	var data = Object.assign({}, req.body) || {};

	Trip.findOneAndUpdate({ _id: req.user._id }, data, { new: true }).then(function (user) {
		res.json(user);
	}).catch(function (err) {
		res.status(500).send(err);
	});
};

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
exports.followers = function (req, res) {

	_user2.default.findOne({ _id: req.params.id }).then(function (user) {

		user.followers(req.user._id).then(function (follower) {
			res.json(follower);
		}).catch(function (err) {
			res.status(422).send(err);
		});
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});

	res.status(200);
};

/* 
|--------------------------------------------------------------------------
| Follow a user
|--------------------------------------------------------------------------
*/
exports.follow = function (req, res) {

	_user2.default.findOne({ _id: req.params.id }).then(function (user) {
		user.follow(req.user._id).then(function (follower) {
			res.json(follower);
		}).catch(function (err) {
			res.status(422).send(err);
		});
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});

	res.status(200);
};

/* 
|--------------------------------------------------------------------------
| Unfollow a user
|--------------------------------------------------------------------------
*/
exports.unfollow = function (req, res) {

	_user2.default.findOne({ _id: req.params.id }).then(function (user) {
		user.unfollow(req.user._id).then(function (follower) {

			//return remaining followers
			user.followers(req.user._id).then(function (followers) {
				res.json(followers);
			}).catch(function (err) {
				res.status(422).send(err);
			});
		}).catch(function (err) {
			res.status(422).send(err);
		});
	}).catch(function (err) {
		res.status(422).send(err.errors);
	});
};