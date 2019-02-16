import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

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
        }
    }
);

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
TripSchema.plugin(bcrypt);
TripSchema.plugin(timestamps);
TripSchema.plugin(mongooseStringQuery);

export default mongoose.model('Trip', TripSchema);