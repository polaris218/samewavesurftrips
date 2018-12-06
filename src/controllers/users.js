import config from '../config';

const ObjectId = require('mongodb').ObjectID;

/**
 * @api {get} /users Request Users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Number}   pages   No. of pages returned.
 * @apiSuccess {Object[]} users Array of users
 * * @apiSuccess {String}   users._id   Unique Id.
 * @apiSuccess {String}   users.first_name   First Name.
 * @apiSuccess {String}   users.last_name   Last Name.
 * * @apiSuccess {String}   users.email   Email address.
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

/**
 * @api {get} /user/:id Request User
 * @apiName GetUser
 * @apiGroup User
 *
 * * @apiSuccess {String}  _id   Unique Id.
 * @apiSuccess {String}   first_name   First Name.
 * @apiSuccess {String}   last_name   Last Name.
 * * @apiSuccess {String} email   Email address.
 */
export const user = (req,res) => {
    const collection = req.db.collection('users');

    collection.find(ObjectId(req.params.id)).toArray(function(err, docs) {
        res.json(docs);
    });
}