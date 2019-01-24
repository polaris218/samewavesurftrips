'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userAdd = exports.user = exports.users = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _notifications = require('./notifications');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = require('mongodb').ObjectID;

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
var users = exports.users = function users(req, res) {

    var user = new _models.User(req);

    user.getAll(req).then(function (users) {
        res.json(users);
    });
};

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
var user = exports.user = function user(req, res) {
    var user = new _models.User(req);

    user.get().then(function (user) {
        res.json(user);
    });
};

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
 * @apiParam {String}   email   Email address.
 * @apiParam {String}   password   Password.
 * @apiParam {String}   gender   Gender.
 * 
 * @apiUse UserObject
 */
var userAdd = exports.userAdd = function userAdd(req, res) {

    var user = new _models.User(req);

    user.doesNotExists().then(function () {

        user.save().then(function (newuser) {
            (0, _notifications.notify_newUser)(newuser.ops[0], res);
            res.json({ error: false, user: newuser });
        }).catch(function (error) {
            res.json({ error: true, details: error });
        });
    }).catch(function (error) {
        res.json({ error: true, message: error });
    });
};