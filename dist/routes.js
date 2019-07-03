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

var _trips = require('./controllers/trips');

var _trips2 = _interopRequireDefault(_trips);

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

var _messages = require('./controllers/messages');

var _messages2 = _interopRequireDefault(_messages);

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

  app.use(_passport2.default.initialize());

  (0, _auth.passportLocalStrategy)();
  // passportFBStrategy()
  (0, _auth.passportFBCustom)();
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
  | Authenticate Local
  |--------------------------------------------------------------------------
  */
  router.post('/v1/auth', _passport2.default.authenticate('local', {
    session: false
  }), _auth.serialize, _auth.generateToken, _auth.respond);

  /* 
  |--------------------------------------------------------------------------
  | Authenticate Facebook
  |--------------------------------------------------------------------------
  */
  // router.get(
  //   '/v1/auth/facebook',
  //   passport.authenticate('facebook', {
  //     session: false
  //   }),
  //   serialize,
  //   generateToken,
  //   respond
  // )
  //
  // app.get(
  //   '/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //     session: false
  //   }),
  //   serialize,
  //   generateToken,
  //   respondFB
  // )

  router.post('/v1/auth/facebook', _passport2.default.authenticate('fb-custom', {
    session: false
  }), _auth.serialize, _auth.generateToken, _auth.respond);

  /* 
  |--------------------------------------------------------------------------
  | Sandbox
  |--------------------------------------------------------------------------
  */
  router.get('/sandbox', function (req, res) {
    res.render('sandbox', { layout: 'main' });
  });

  /* 
  |--------------------------------------------------------------------------
  | User routes
  |--------------------------------------------------------------------------
  */
  router.get('/v1/users', authenticate, _users2.default.getAll);
  router.get('/v1/user/:id', authenticate, _users2.default.get);
  router.post('/v1/users', _users2.default.create);
  router.put('/v1/user', authenticate, _users2.default.update);
  router.post('/v1/user/avatar', authenticate, _users2.default.avatar);
  router.post('/v1/user/cover', authenticate, _users2.default.coverImage);
  router.get('/v1/user/:id/avatar', _users2.default.getAvatar);
  router.get('/v1/user/:id/cover', _users2.default.getCover);
  router.get('/v1/user/:id/follow', authenticate, _users2.default.follow);
  router.get('/v1/user/:id/unfollow', authenticate, _users2.default.unfollow);
  router.get('/v1/user/:id/followers', authenticate, _users2.default.followers);

  //   router.get(`/v1/user/:id/following`, authenticate, User.following)

  /* 
  |--------------------------------------------------------------------------
  | Trip routes
  |--------------------------------------------------------------------------
  */
  router.get('/v1/trips', authenticate, _trips2.default.getAll);
  router.get('/v1/trips/:userid', authenticate, _trips2.default.getUserTrips);
  router.post('/v1/trips', authenticate, _trips2.default.create);
  router.put('/v1/trip/:id', authenticate, _trips2.default.update);
  router.delete('/v1/trip/:id', authenticate, _trips2.default.delete);
  router.get('/v1/trip/:id/join', authenticate, _trips2.default.join);
  router.get('/v1/trip/:id/leave', authenticate, _trips2.default.leave);
  //router.get(`/v1/trips/geocode`, Trip.geocode);

  /* 
  |--------------------------------------------------------------------------
  | Search trips
  |--------------------------------------------------------------------------
  */
  router.get('/v1/search/trips', _trips2.default.search);
  router.get('/v1/search/destination', _trips2.default.searchDestination);

  /* 
  |--------------------------------------------------------------------------
  | Message routes
  |--------------------------------------------------------------------------
  */
  router.get('/v1/messages', authenticate, _messages2.default.getAll);
  router.post('/v1/messages', authenticate, _messages2.default.create);
  router.delete('/v1/messages/:id', authenticate, _messages2.default.delete);
  router.post('/v1/message/trip/:tripId', authenticate, _messages2.default.messageTripAttendees);

  /* 
  |--------------------------------------------------------------------------
  | Refresh token
  |--------------------------------------------------------------------------
  */
  router.post('/v1/token', _auth.refreshToken, _auth.serialize, _auth.generateToken, _auth.respond);

  /* 
  |--------------------------------------------------------------------------
  | Home
  |--------------------------------------------------------------------------
  */
  router.get('*', function (req, res) {
    res.render('samewave', { layout: 'app' });
  });

  return router;
}