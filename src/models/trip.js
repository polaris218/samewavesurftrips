import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import User from './user';
import Follower from './follower';

/* 
|--------------------------------------------------------------------------
| Trip Schema
|--------------------------------------------------------------------------
*/
const TripSchema = new Schema(
    {
        
        owner_id: {
            type: Schema.Types.ObjectId,
            required: true
        },

        owner_details: {
            type: Schema.Types.Mixed,
            required: true
        },
        
        title: {
            type: String,
			required: true
        },

        departing: {
            type: String,
			required: true
        },

        destination: {
            type: String,
			required: true
        },

        date_times: {
            departure_date_time: {
                type: Date,
                required: true
            },

            return_date_time: {
                type: Date,
                required: true
            }
        },

        number_of_surfers: {
            type: Number,
			required: false
        },

        gender: {
            type: String,
            lowercase: true,
			required: false
        },

        surf_modality: {
            type: String,
            lowercase: true,
			required: false
        },

        surf_level: {
            type: String,
            lowercase: true,
			required: false
        },

        transport: {
            type: String,
            lowercase: true,
			required: false
        },

        accomodation: {
            type: String,
            lowercase: true,
			required: false
        },

        offering_rides: {
            type: Boolean,
			required: false
        },

        available_seats: {
            type: Number,
			required: false
        },

        trip_details: {
            type: String,
			required: false
        },

        attendees: {
            type: Array,
            required: true
        }


    }
);

/* 
|--------------------------------------------------------------------------
| Join Trip
|--------------------------------------------------------------------------
*/
TripSchema.methods.join = function(attendee) {
    if(this.attendees.indexOf(attendee) != -1) return;

    this.attendees.push(attendee);
    this.save();
    
    return;
};

/* 
|--------------------------------------------------------------------------
| Leave Trip
|--------------------------------------------------------------------------
*/
TripSchema.methods.leave = function(attendee) {
    if(this.attendees.indexOf(attendee) == -1) return;

    let index = this.attendees.indexOf(attendee);

    this.attendees.splice(index, 1);
    this.save();
    
    return;
};

/* 
|--------------------------------------------------------------------------
| Pre-save hook
|--------------------------------------------------------------------------
*/
TripSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
    }
    
    //add owner details to trip -- 
    User.findOne({_id: this.owner_id}).then(user => {
        let sanitized = user.toObject();
        delete sanitized.password;
        this.owner_details = sanitized;
        next();
	}).catch(err => {
		res.status(422).send(err.errors);
    });
    

});

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
TripSchema.plugin(bcrypt);
TripSchema.plugin(timestamps);
TripSchema.plugin(mongooseStringQuery);


export default mongoose.model('Trip', TripSchema);