import config from '../config';
import { notify_newUser } from './notifications';
import { User, parse } from '../models';

const ObjectId = require('mongodb').ObjectID;
 
/* 
|--------------------------------------------------------------------------
| Get all users
|--------------------------------------------------------------------------
*/
/**
 * @api {get} /users Request Users
 * @apiName GetUsers
 * @apiGroup User
 * 
 * @apiParam {String} skip No. of records to skip.
 *
 * @apiSuccess {Number}   pages   No. of pages returned.
 * @apiSuccess {Object[]} users Array of users
 */
export const users = (req,res) => {
		
    const collection = req.db.collection('users');
    const skip = parseInt(req.query.skip) || 0;

    collection.count().then(total=>{
        const pages = Math.ceil(total / config.db.paging);
        
        collection.find().skip(skip).limit(config.db.paging).sort({"last_name": -1}).toArray(function(err, users) {
            res.json({"pages":pages,users});
        });
    });
    
}

/* 
|--------------------------------------------------------------------------
| Get user
|--------------------------------------------------------------------------
*/
/**
 * @api {get} /user/:id Request User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id Unique id of the user.
 * 
 * @apiUse UserObject
 */
export const user = (req,res) => {
    const collection = req.db.collection('users');

    collection.find(ObjectId(req.params.id)).toArray(function(err, docs) {
        res.json(docs);
    });
}

/* 
|--------------------------------------------------------------------------
| Add a user
|--------------------------------------------------------------------------
*/
/**
 * @api {post} /users Add User
 * @apiName AddUser
 * @apiGroup User 
 *
 * @apiParam {String}  first_name   First Name.
 * @apiParam {String}  last_name   Last Name.
 * @apiParam {String}  email   Email address.
 * 
 * @apiUse UserObject
 */
export const userAdd = (req,res) => {
    const collection = req.db.collection('users');

    let userModel = new User().set(req.body);
    
    collection.insert(userModel, function(err, records){
        notify_newUser(req.body.email, res);
        res.json(records.ops);
    });
}

