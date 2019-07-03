'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportLocalStrategy = passportLocalStrategy;
exports.passportFBCustom = passportFBCustom;
exports.generateToken = generateToken;
exports.respond = respond;
exports.respondFB = respondFB;
exports.serialize = serialize;
exports.refreshToken = refreshToken;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportCustom = require('passport-custom');

var _passportCustom2 = _interopRequireDefault(_passportCustom);

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

// export function passportFBStrategy () {
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: config.auth.facebook_app_id,
//         clientSecret: config.auth.facebook_app_secret,
//         callbackURL: `https://${config.domain}/auth/facebook/callback`,
//         profileFields: [ 'emails' ]
//       },
//       function (accessToken, refreshToken, profile, done) {
//         let username = `${profile.id}_facebook`
//         //check to see if user already exists ---
//         User.findOne({ username: username })
//           .then(user => {
//             if (user) {
//               done(null, user)
//             } else {
//               //create new user ---
//               User.create({
//                 username: username,
//                 password: process.env.DEFAULT_PASS,
//                 email: profile.email,
//                 avatar: profile.picture,
//                 firstName: profile.first_name,
//                 lastName: profile.last_name
//               })
//                 .then(user => {
//                   done(null, user)
//                 })
//                 .catch(err => {
//                   done(null, false)
//                 })
//             }
//           })
//           .catch(err => {
//             done(null, false)
//           })
//       }
//     )
//   )
// }

function passportFBCustom() {
  _passport2.default.use('fb-custom', new _passportCustom2.default(function (req, done) {
    var profile = req.body;
    var username = profile.id + '_facebook';

    //check to see if user already exists
    _user2.default.findOne({ username: username }).then(function (user) {
      // user exists
      if (user) {
        return done(null, user);
      }

      // user doesn't exist - create new user
      var data = {
        username: username,
        password: process.env.DEFAULT_PASS,
        email: profile.email,
        avatar: profile.picture.data.url,
        first_name: profile.name,
        last_name: profile.name
      };
      _user2.default.create(data).then(function (user) {
        return done(null, user);
      }).catch(function (err) {
        return done(err, false);
      });
    }).catch(function (err) {
      return done(err, false);
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
| Respond with token - FACEBOOK LOGIN
|--------------------------------------------------------------------------
*/
function respondFB(req, res) {
  var refreshToken = _randToken2.default.uid(256);
  _config2.default.auth.refreshTokens[refreshToken] = req.user._id;

  res.redirect('/auth?token=' + req.token + '&refreshToken=' + refreshToken + '&user=' + req.user._id);
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

  /* 
  |--------------------------------------------------------------------------
  | Refresh token.
  |--------------------------------------------------------------------------
  */
};function refreshToken(req, res, next) {
  var expiredToken = void 0;
  var refreshToken = req.body.refreshToken;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    expiredToken = req.headers.authorization.split(' ')[1];
  }

  var user = _jsonwebtoken2.default.verify(expiredToken, _config2.default.auth.secret, {
    ignoreExpiration: true
  });

  if (refreshToken in _config2.default.auth.refreshTokens && _config2.default.auth.refreshTokens[refreshToken] == user._id) {
    req.user = user;
    delete _config2.default.auth.refreshTokens[refreshToken];
    next();
  } else {
    res.status(422).send('Invalid refresh token');
  }
}