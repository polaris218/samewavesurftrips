import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import { notify_newUser } from '../controllers/notifications';
import Follower from './follower';
import aws from 'aws-sdk';
import uuid from 'node-uuid';

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
        },

        full_name: {
            type: String,
			required: false
        },

        bio: {
            type: String,
			required: false
        },

        avatar: {
            type: String,
			required: false
        },

        cover_image: {
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

    return new Promise((resolve, reject) => {
    
        Follower.find({user_id: this._id }).then(followers => {
            resolve(followers);
        }).catch(err => {
            reject(err);
        });
    
    });

};

/* 
|--------------------------------------------------------------------------
| Get avatar
|--------------------------------------------------------------------------
*/
UserSchema.methods.getAvatar = function(res){
   
    //create spaces instance ---
    const s3 = new aws.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
    });

    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: this.avatar
    };

    res.attachment(this.avatar);
    var fileStream = s3.getObject(s3Params).createReadStream();
    fileStream.pipe(res);
}

/* 
|--------------------------------------------------------------------------
| Update avatar
|--------------------------------------------------------------------------
*/
UserSchema.methods.updateAvatar = function(file) {

    return new Promise((resolve, reject) => {

	    let ext, unique, oldfile;
        
        if (!file) {
            reject();
        }
        
        oldfile = this.avatar;
        ext = file.name.substring(file.name.indexOf('.')); 
	    unique = uuid.v4()+ext;

	    const spacesEndpoint = new aws.Endpoint(process.env.DO_ENDPOINT);
	    const fileType = file.type;
	
        //create spaces instance ---
        const s3 = new aws.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
        });

        //spaces options ---
        const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: unique,
        Expires: 60,
        ContentType: fileType,
        ContentDisposition: 'inline',
        ACL: 'public-read',
            Body: file.data
        };

        //upload to spaces ---
        s3.upload(s3Params, (s3Err, data) => {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)

            this.avatar = unique;
            this.save();

            //delete the old avatar ---
            if(oldfile){
                try {
                
                    s3.deleteObject({
                        Bucket: process.env.S3_BUCKET,
                        Key: oldfile
                    }, function(err, data) {
                        if (err) console.log(err, err.stack); 
                    });

                }catch(e){
                    console.log(e);
                }
            }

            resolve(unique);
        });

    });

}


/* 
|--------------------------------------------------------------------------
| Update Cover
|--------------------------------------------------------------------------
*/
UserSchema.methods.updateCover = function(file) {

    return new Promise((resolve, reject) => {

	    let ext, unique, oldfile;
        
        if (!file) {
            reject();
        }
        
        oldfile = this.cover_image;
        
        ext = file.name.substring(file.name.indexOf('.')); 
	    unique = uuid.v4()+ext;

	    const spacesEndpoint = new aws.Endpoint(process.env.DO_ENDPOINT);
	    const fileType = file.type;
	
        //create spaces instance ---
        const s3 = new aws.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
        });

        //spaces options ---
        const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: unique,
        Expires: 60,
        ContentType: fileType,
        ContentDisposition: 'inline',
        ACL: 'public-read',
            Body: file.data
        };

        //upload to spaces ---
        s3.upload(s3Params, (s3Err, data) => {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)

            this.cover_image = unique;
            this.save();

            //delete the old avatar ---
            if(oldfile){
                try {
                
                    s3.deleteObject({
                        Bucket: process.env.S3_BUCKET,
                        Key: oldfile
                    }, function(err, data) {
                        if (err) console.log(err, err.stack); 
                    });

                }catch(e){
                    console.log(e);
                }
            }

            resolve(unique);
        });

    });

}

/* 
|--------------------------------------------------------------------------
| Pre-save hook
|--------------------------------------------------------------------------
*/
UserSchema.pre('save', function(next) {

	if (!this.isNew) {
		next();
	}else{
        notify_newUser(this);
        next();
    }

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