import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import { notify_newUser } from '../controllers/notifications';
import Follower from './follower';

mongoose.set('useCreateIndex', true);

/* 
|--------------------------------------------------------------------------
| User Schema
|--------------------------------------------------------------------------
*/
const UserSchema = new Schema(
{
        
        first_name: {
            type: String,
			required: true
        },

        last_name: {
            type: String,
			required: true
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true,
        },

        password: {
            type: String,
			required: true,
            bcrypt: true
        },

        gender: {
            type: String,
			required: false
        }
     
    }
);


/* 
|--------------------------------------------------------------------------
| Follow user
|--------------------------------------------------------------------------
*/
UserSchema.methods.follow = function(follower_id) {

    return new Promise((resolve, reject) => {
        
        Follower.create({user_id: this._id, follower_id}).then(follower => {
            resolve(follower);
        }).catch(err => {
            reject(err);
        });

    });

};


/* 
|--------------------------------------------------------------------------
| Unfollow user
|--------------------------------------------------------------------------
*/
UserSchema.methods.unfollow = function(follower_id) {

    return new Promise((resolve, reject) => {

        Follower.findOneAndDelete({user_id : this._id, follower_id }, function (err,follower){
            if (!err)
                resolve();
            else
                reject(err);
        });
        
    });

};


/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
UserSchema.methods.followers = function() {

    Follower.find({user_id: this._id }).then(followers => {
		console.log(followers, '... followers');
	}).catch(err => {
		res.status(422).send(err.errors);
    });

};

/* 
|--------------------------------------------------------------------------
| Pre-save hook
|--------------------------------------------------------------------------
*/
UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
	}

    notify_newUser(this);
    next();

});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

/* 
|--------------------------------------------------------------------------
| Set indexes
|--------------------------------------------------------------------------
*/
UserSchema.index({ email: 1 });

export default mongoose.model('User', UserSchema);