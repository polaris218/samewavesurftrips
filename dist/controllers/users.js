'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAdd = exports.user = exports.users = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _notifications = require('./notifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = require('mongodb').ObjectID;

/**
 * @apiDefine UserObject
 * @apiSuccess {String}   _id   Unique id.
 * @apiSuccess {String}   first_name   First Name.
 * @apiSuccess {String}   last_name   Last Name.
 * @apiSuccess {String}   email   Email address.
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
var users = exports.users = function users(req, res) {

    var collection = req.db.collection('users');
    var skip = parseInt(req.query.skip) || 0;

    collection.count().then(function (total) {
        var pages = Math.ceil(total / _config2.default.db.paging);

        collection.find().skip(skip).limit(_config2.default.db.paging).sort({ "last_name": -1 }).toArray(function (err, users) {
            res.json({ "pages": pages, users: users });
        });
    });
};

/**
 * @api {get} /user/:id Request User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id Unique id of the user.
 * 
 * @apiUse UserObject
 */
var user = exports.user = function user(req, res) {
    var collection = req.db.collection('users');

    collection.find(ObjectId(req.params.id)).toArray(function (err, docs) {
        res.json(docs);
    });
};

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
var userAdd = exports.userAdd = function userAdd(req, res) {
    var collection = req.db.collection('users');

    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    };

    console.log(user);

    collection.insert(user, function (err, records) {
        (0, _notifications.notify_newUser)(req.body.email, res);
        res.json(records.ops);
    });
};