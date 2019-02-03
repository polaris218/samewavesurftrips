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
			required: false
        },

        surf_modality: {
            type: String,
			required: false
        },

        surf_level: {
            type: String,
			required: false
        },

        transport: {
            own_vehicle: {
                type: String,
			    required: false
            },

            offer_rides: {
                type: Boolean,
                required: false
            },

            available_seats: {
                type: Number, 
                required: false
            },

            bring_own_surfboards: {
                type: Boolean,
                required: false
            },

            max_surfboards: {
                type: Number,
                required: false
            }
        },

        accomodation: {
            name: {
                type: String,
                required: false
            },

            location: {
                type:String,
                required: false
            }
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