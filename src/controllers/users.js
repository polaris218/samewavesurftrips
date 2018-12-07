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

    new User().getAll(req).then(users => {
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
    new User().get(req).then(user => {
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

    new User().save(req).then(users => {
        notify_newUser(req.body.email, res);
        res.json(users);
    }) 
    
}

