import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

/* 
|--------------------------------------------------------------------------
| Follower Schema
|--------------------------------------------------------------------------
*/
const FollowerSchema = new Schema(
{
 
        user_id: {
            type:  Schema.Types.ObjectId,
			required: true
        },

        follower_id: {
            type:  Schema.Types.ObjectId,
			required: true
        },
     
    }
);

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
FollowerSchema.plugin(timestamps);
FollowerSchema.plugin(mongooseStringQuery);

export default mongoose.model('Follower', FollowerSchema);