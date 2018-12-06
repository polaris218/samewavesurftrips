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

var _users = require('./controllers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = void 0;

/* 
|--------------------------------------------------------------------------
| Routes Init
|--------------------------------------------------------------------------
*/
function routesInit(a) {
	app = a;
}

/* 
|--------------------------------------------------------------------------
| API V1
|--------------------------------------------------------------------------
*/
var router = _express2.default.Router();
function routes() {

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
 | USERS
 |--------------------------------------------------------------------------
 */
	router.get('/v1/users', _users.users);
	router.get('/v1/user/:id', _users.user);
	router.post('/v1/users', _users.userAdd);

	return router;
}