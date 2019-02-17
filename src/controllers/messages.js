import Message from '../models/message';
import mongoose from 'mongoose';

/* 
|--------------------------------------------------------------------------
| Get Messages
|--------------------------------------------------------------------------
*/
exports.getAll = (req,res) => {

    Message.find({recipient_id: req.user._id}).then(message => {
		res.json(message);
	}).catch(err => {
		res.status(422).send(err);
    });
    
}


/* 
|--------------------------------------------------------------------------
| Create Message
|--------------------------------------------------------------------------
*/
exports.create = (req,res) => {

	const modelData = setDefaultValues(req);

    Message.create(modelData).then(message => {
		res.json(message);
	}).catch(err => {
		res.status(500).send(err);
	});
}

/* 
|--------------------------------------------------------------------------
| Delete Message
|--------------------------------------------------------------------------
*/
exports.delete = (req,res) => {

    Message.remove({_id: req.params.id, recipient_id: req.user._id}).then(message => {
		res.json(message);
	}).catch(err => {
		res.status(500).send(err);
	});
}


/* 
|--------------------------------------------------------------------------
| Populate nested objects & defaults 
|--------------------------------------------------------------------------
*/
function setDefaultValues(req) {

	const modelData = Object.assign({}, req.body, { 
       
		owner_id: req.user._id,
		recipient_id: mongoose.Types.ObjectId(req.body.recipient_id)
        
	});

	return modelData;
}


	