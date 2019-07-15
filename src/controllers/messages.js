import Message from '../models/message'
import Trip from '../models/trip'
import mongoose from 'mongoose'
import { isRegExp } from 'util';

/* 
|--------------------------------------------------------------------------
| Get Messages
|--------------------------------------------------------------------------
*/
exports.getAll = (req, res) => {
  Message.find({
      recipient_id: req.user._id
    })
    .then(message => {
      // res.json(message)
      Message.find({
          owner_id: req.user._id
        })
        .then(ownMessage => {
          const allMsgs = [...ownMessage, ...message]
          res.json(allMsgs)
        })
        .catch(err => {
          res.status(422).send(err)
        })
    })
    .catch(err => {
      res.status(422).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
| Create Message
|--------------------------------------------------------------------------
*/
exports.create = (req, res) => {
  const modelData = setDefaultValues(req)

  Message.create(modelData)
    .then(message => {
      Message.updateMany({
        "msg_read": false,
        "recipient_id": message.owner_id,
        "owner_id": message.recipient_id
      }, {
        $set: {
          "msg_read": true
        }
      }, {
        upsert: false,
        multi: true
      }, function (err, res1) {});
      res.json(message)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
| Update Message Status
|--------------------------------------------------------------------------
*/
exports.update = (req, res) => {
if(req.body.subject!='undefined' && req.body.recipient_id!='undefined' && req.body.owner_id!='undefined' && req.body.msg_read!='undefined'){
  Message.updateMany({
    "msg_read": false,
    "subject": req.body.subject,
    "recipient_id": mongoose.Types.ObjectId(req.body.recipient_id),
    "owner_id": mongoose.Types.ObjectId(req.body.owner_id)},
    { $set: {"msg_read": true }},{upsert: false,multi: true})
        .then(data => {
    return res.status(200).json({"message":"ok"});
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}
}

/* 
|--------------------------------------------------------------------------
| Group Message
|--------------------------------------------------------------------------
*/
exports.messageTripAttendees = (req, res) => {
  Trip.findOne({
    _id: req.params.tripId
  }).then(trip => {
    trip.attendees.forEach(user => {
      const modelData = Object.assign({}, req.body, {
        owner_id: req.user._id,
        recipient_id: mongoose.Types.ObjectId(user),
        trip_id: req.params.tripId
      })

      Message.create(modelData)
    })
  })
}

/* 
|--------------------------------------------------------------------------
| Delete Message
|--------------------------------------------------------------------------
*/
exports.delete = (req, res) => {
  Message.remove({
      _id: req.params.id,
      recipient_id: req.user._id
    })
    .then(message => {
      res.json(message)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {
  const modelData = Object.assign({}, req.body, {
    owner_id: mongoose.Types.ObjectId(req.body.owner_id) || req.user._id,
    recipient_id: mongoose.Types.ObjectId(req.body.recipient_id)
  })
  return modelData
}