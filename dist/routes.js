'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.routesInit = routesInit;
exports.routes = routes;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./controllers/auth');

var _users = require('./controllers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = (0, _expressJwt2.default)({ secret: _config2.default.auth.secret });
var app = void 0;

/* 
|--------------------------------------------------------------------------
| Routes Init
|--------------------------------------------------------------------------
*/
function routesInit(a) {
	app = a;
	(0, _auth.passportLocalStrategy)();
	app.use(_passport2.default.initialize());
}

/* 
|--------------------------------------------------------------------------
| API V1
|--------------------------------------------------------------------------
*/
var router = _express2.default.Router();
function routes() {

	/**
  * @api {post} /auth Request Auth Token
  * @apiName RequestToken
  * @apiGroup Auth
  * 
  * @apiParam {String} email Email / password of user account
  * @apiParam {String} password Password of user account
  *
  * @apiSuccess {String}   _id   id of authenticated user account
  * @apiSuccess {String} token Authentication token
  */
	router.post('/v1/auth', _passport2.default.authenticate('local', {
		session: false
	}), _auth.serialize, _auth.generateToken, _auth.respond);

	/* 
 |--------------------------------------------------------------------------
 | HOME
 |--------------------------------------------------------------------------
 */
	router.get('/', function (req, res) {
		res.json({ 'msg': 'Hello World!' });
	});

	/* 
 |--------------------------------------------------------------------------
 | Login
 |--------------------------------------------------------------------------
 */
	router.get('/login', function (req, res) {
		res.render('login', { 'layout': 'main' });
	});

	/* 
 |--------------------------------------------------------------------------
 | USERS
 |--------------------------------------------------------------------------
 */
	router.get('/v1/users', authenticate, _users.users);
	router.get('/v1/user/:id', _users.user);
	router.post('/v1/users', _users.userAdd);

	return router;
}