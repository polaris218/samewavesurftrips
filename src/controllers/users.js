
import User from '../models/user';
import aws from 'aws-sdk';
import uuid from 'node-uuid';


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
| Update user
|--------------------------------------------------------------------------
*/
exports.update = (req,res) => {

	const data = Object.assign({}, req.body) || {};

	User.findOneAndUpdate({_id: req.user._id}, data,{new: true}).then(user => {
		res.json(user)
	}).catch(err => {
		res.status(500).send(err);
	})
 
}

/* 
|--------------------------------------------------------------------------
| Display avatar
|--------------------------------------------------------------------------
*/
exports.getAvatar = (req, res) => {
	
	User.findOne({_id: req.params.id}).then(user => {

		const url = `https://${process.env.S3_BUCKET}.${process.env.DO_ENDPOINT_CDN}/${user.avatar}`;

		res.send(url);

	}).catch(err => {
		res.status(422).send(err.errors);
  });
}

/* 
|--------------------------------------------------------------------------
| Display cover image
|--------------------------------------------------------------------------
*/
exports.getCover = (req, res) => {
	
	User.findOne({_id: req.params.id}).then(user => {

		const url = `https://${process.env.S3_BUCKET}.${process.env.DO_ENDPOINT_CDN}/${user.cover_image}`;

		res.send(url);

	}).catch(err => {
		res.status(422).send(err.errors);
  });
}

/* 
|--------------------------------------------------------------------------
| Update avatar
|--------------------------------------------------------------------------
*/
exports.avatar = (req,res) => {

	User.findOne({_id: req.user._id}).then(user => {
		
		user.updateAvatar(req.files.avatar).then(file=>{
			res.json(file);
		});

	}).catch(err => {
		res.status(422).send(err.errors);
  });

}

/* 
|--------------------------------------------------------------------------
| Cover Image
|--------------------------------------------------------------------------
*/
exports.coverImage = (req,res) => {

	User.findOne({_id: req.user._id}).then(user => {
		
		user.updateCover(req.files.cover).then(file=>{
			res.json(file);
		});

	}).catch(err => {
		res.status(422).send(err.errors);
  });

}

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
exports.followers = (req,res) => {

	User.findOne({_id: req.params.id}).then(user => {
		
		user.followers(req.user._id).then(follower => {
			res.json(follower);
		}).catch(err => {
			res.status(422).send(err);
		});
		
	}).catch(err => {
		res.status(422).send(err.errors);
	});
	
	res.status(200);
    
}

/* 
|--------------------------------------------------------------------------
| Follow a user
|--------------------------------------------------------------------------
*/
exports.follow = (req,res) => {

	User.findOne({_id: req.params.id}).then(user => {
		user.follow(req.user._id).then(follower => {
			res.json(follower);
		}).catch(err => {
			res.status(422).send(err);
		});
		
	}).catch(err => {
		res.status(422).send(err.errors);
	});
	
	res.status(200);
    
}

/* 
|--------------------------------------------------------------------------
| Unfollow a user
|--------------------------------------------------------------------------
*/
exports.unfollow = (req,res) => {

	User.findOne({_id: req.params.id}).then(user => {
		user.unfollow(req.user._id).then(follower => {

			//return remaining followers
			user.followers(req.user._id).then(followers => {
				res.json(followers);
			}).catch(err => {
				res.status(422).send(err);
			});

		}).catch(err => {
			res.status(422).send(err);
		})
	}).catch(err => {
		res.status(422).send(err.errors);
    });
    
}

