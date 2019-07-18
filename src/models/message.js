import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'
import mongooseStringQuery from 'mongoose-string-query'

/* 
|--------------------------------------------------------------------------
| Message Schema
|--------------------------------------------------------------------------
*/
const MessageSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    required: true
  },

  recipient_id: {
    type: Schema.Types.ObjectId,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  trip_id: {
    type: String,
    required: false
  },
  msg_read: {
    type: Boolean,
    default:false,
  }
})

/* 
|--------------------------------------------------------------------------
| Plugins
|--------------------------------------------------------------------------
*/
MessageSchema.plugin(bcrypt)
MessageSchema.plugin(timestamps)
MessageSchema.plugin(mongooseStringQuery)

export default mongoose.model('Message', MessageSchema)
