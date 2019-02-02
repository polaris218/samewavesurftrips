import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import { notify_newUser } from '../controllers/notifications';

mongoose.set('useCreateIndex', true);

export const UserSchema = new Schema(
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

UserSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
	}

    notify_newUser(this);
    next();

});

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
UserSchema.index({ email: 1 });

module.exports = exports = mongoose.model('User', UserSchema);