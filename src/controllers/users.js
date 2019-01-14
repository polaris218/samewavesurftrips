import config from '../config';
import { notify_newUser } from './notifications';
import { User } from '../models';

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
 * @apiParam {String} sort Field to sort results by.
 *
 * @apiSuccess {Number}   pages   No. of pages returned.
 * @apiSuccess {Object[]} users Array of users
 */
export const users = (req,res) => {

    const user = new User(req);

    user.getAll(req).then(users => {
        res.json(users);
    })
		
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
    const user = new User(req);

    user.get().then(user => {
        res.json(user);
    })
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
 * @apiParam {String}  password   Password.
 * 
 * @apiUse UserObject
 */
export const userAdd = (req,res) => {

    const user = new User(req);
    
    user.doesNotExists().then(()=>{

        user.save().then(newuser => {
            notify_newUser(newuser.ops[0], res);
            res.json({error: false, user:newuser});
        }).catch(error=>{
            res.json({error: true, details:error});
        });

    }).catch(error=>{
        res.json({error: true, message: 'Email address is already registered'});
    });
   
    
}

