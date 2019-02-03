'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportLocalStrategy = passportLocalStrategy;
exports.generateToken = generateToken;
exports.respond = respond;
exports.serialize = serialize;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

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

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

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