'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportLocalStrategy = passportLocalStrategy;
exports.passportFBStrategy = passportFBStrategy;
exports.generateToken = generateToken;
exports.respond = respond;
exports.serialize = serialize;
exports.refreshToken = refreshToken;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| passport strategy - local
|--------------------------------------------------------------------------
*/
function passportLocalStrategy() {
  _passport2.default.use(new _passportLocal2.default({ passReqToCallback: true }, function (req, username, password, done) {

    _user2.default.find({ email: username }).then(function (user) {

      if (user.length) {
        _bcrypt2.default.compare(password, user[0].password, function (err, res) {
          if (res) {
            done(null, user[0]);
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    }).catch(function (err) {
      done(null, false);
    });
  }));
}

/* 
|--------------------------------------------------------------------------
| passport strategy - facebook
|--------------------------------------------------------------------------
*/
function passportFBStrategy() {

  _passport2.default.use(new _passportFacebook2.default({
    clientID: _config2.default.auth.facebook_app_id,
    clientSecret: _config2.default.auth.facebook_app_secret,
    callbackURL: 'https://' + _config2.default.domain + '/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {

    console.log(profile);
    done(null, [{}]);
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }));
}

/* 
|--------------------------------------------------------------------------
| passport middleware
|--------------------------------------------------------------------------
*/
function generateToken(req, res, next) {

  req.token = _jsonwebtoken2.default.sign({
    _id: req.user._id
  }, _config2.default.auth.secret, {
    expiresIn: _config2.default.auth.expires
  });
  next();
}

/* 
|--------------------------------------------------------------------------
| Respond with token
|--------------------------------------------------------------------------
*/
function respond(req, res) {

  var refreshToken = _randToken2.default.uid(256);
  _config2.default.auth.refreshTokens[refreshToken] = req.user._id;

  res.status(200).json({
    user: req.user,
    token: req.token,
    refreshToken: refreshToken
  });
}

/* 
|--------------------------------------------------------------------------
| Serialize json token
|--------------------------------------------------------------------------
*/
function serialize(req, res, next) {
  db.updateOrCreate(req.user, function (err, user) {
    if (err) {
      return next(err);
    }
    req.user = {
      _id: user._id
    };
    next();
  });
}

var db = {
  updateOrCreate: function updateOrCreate(user, cb) {
    cb(null, user);
  }
};

/* 
|--------------------------------------------------------------------------
| Refresh token.
|--------------------------------------------------------------------------
*/
function refreshToken(req, res, next) {

  var expiredToken = void 0;
  var refreshToken = req.body.refreshToken;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    expiredToken = req.headers.authorization.split(' ')[1];
  }

  var user = _jsonwebtoken2.default.verify(expiredToken, _config2.default.auth.secret);

  if (refreshToken in _config2.default.auth.refreshTokens && _config2.default.auth.refreshTokens[refreshToken] == user._id) {
    req.user = user;
    delete _config2.default.auth.refreshTokens[refreshToken];
    next();
  } else {
    res.status(422).send("Invalid refresh token");
  }
}