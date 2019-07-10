'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _notifications = require('../controllers/notifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenid() {
  var length = 16;
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&*()_+';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }return result;
}

/* 
|--------------------------------------------------------------------------
| Get all users
|--------------------------------------------------------------------------
*/
exports.getAll = function (req, res) {
  _user2.default.find().then(function (users) {
    res.json(users);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Get user
|--------------------------------------------------------------------------
*/
exports.get = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    res.json(user);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Add a user
|--------------------------------------------------------------------------
*/
exports.create = function (req, res) {
  var data = Object.assign({
    username: req.body.email
  }, req.body) || {};

  _user2.default.create(data).then(function (user) {
    res.json(user);
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
|Forgot Password
|--------------------------------------------------------------------------
*/
exports.forgot = function (req, res) {
  if (!req.body.username || req.body.username.trim().length == 0) {
    return res.status(400).json({
      "message": "email is required"
    });
  }

  var token = tokenid();
  var data = Object.assign({
    resetToken: token,
    resetPassword: false
  }) || {};
  var url = 'http://' + req.headers.host + '/reset_password?token=' + token;

  _user2.default.findOneAndUpdate({
    username: req.body.username
  }, data, {
    new: true
  }).then(function (user) {
    if (user) {
      (0, _notifications.notify_forgot)(user, url);
      return res.status(200).json({
        'message': 'Mail Sent to your email id : ' + req.body.username
      });
    } else {
      return res.status(400).json({
        'message': 'Invalid Email'
      });
    }
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
|Reset Password Password
|--------------------------------------------------------------------------
*/
exports.resetPassword = function (req, res) {

  if (!req.body.token || req.body.token.trim().length == 0) {
    return res.status(400).json({
      "message": "Invalid Token"
    });
  }
  if (!req.body.password || req.body.password.trim().length == 0) {
    return res.status(400).json({
      "message": "Password field is required"
    });
  }
  var token = req.body.token.trim();
  var pass = req.body.password.trim();
  var match = Object.assign({
    resetToken: token,
    resetPassword: false
  });
  var data1 = Object.assign({
    password: pass,
    resetPassword: true,
    resetToken: ""
  });

  _user2.default.findOneAndUpdate(match, data1, {
    new: true
  }).then(function (user) {
    if (user) {
      return res.status(200).json({
        message: "Password Reset Successfully"
      });
    } else {
      return res.status(400).json({
        'message': 'Invalid Token or Token Expired'
      });
    }
  }).catch(function (err) {
    res.status(400).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Update user
|--------------------------------------------------------------------------
*/
exports.update = function (req, res) {
  var data = Object.assign({}, req.body) || {};

  _user2.default.findOneAndUpdate({
    _id: req.user._id
  }, data, {
    new: true
  }).then(function (user) {
    res.json(user);
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

/* 
|--------------------------------------------------------------------------
| Display avatar
|--------------------------------------------------------------------------
*/
exports.getAvatar = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    var url = 'https://' + process.env.S3_BUCKET + '.' + process.env.DO_ENDPOINT_CDN + '/' + user.avatar;

    res.send(url);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Display cover image
|--------------------------------------------------------------------------
*/
exports.getCover = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    var url = 'https://' + process.env.S3_BUCKET + '.' + process.env.DO_ENDPOINT_CDN + '/' + user.cover_image;

    res.send(url);
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Update avatar
|--------------------------------------------------------------------------
*/
exports.avatar = function (req, res) {
  _user2.default.findOne({
    _id: req.user._id
  }).then(function (user) {
    user.updateAvatar(req.files.avatar).then(function (file) {
      res.json(file);
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Cover Image
|--------------------------------------------------------------------------
*/
exports.coverImage = function (req, res) {
  _user2.default.findOne({
    _id: req.user._id
  }).then(function (user) {
    user.updateCover(req.files.cover).then(function (file) {
      res.json(file);
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
exports.followers = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    user.followers(req.user._id).then(function (follower) {
      return res.json(follower);
    }).catch(function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
  res.status(200);
};

/* 
|--------------------------------------------------------------------------
| Follow a user
|--------------------------------------------------------------------------
*/
exports.follow = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    user.follow(req.user._id).then(function (follower) {
      console.log("user 1", user._id);
      console.log(" req=", req.user._id);

      _user2.default.findOneAndUpdate({ _id: req.user._id }, {
        $push: {
          following: [user._id]
        }
      }, {
        new: true
      }).then(function (user1) {
        console.log("u1=", user1);
        // if (user) {
        //   return res.status(200).json({
        //     message: "Password Reset Successfully"
        //   });
        // } else {
        //   return res.status(400).json({
        //     'message': 'Invalid Token or Token Expired'
        //   });
        // }
      });
      // .catch(err => {
      //   res.status(400).send(err)
      // })


      res.json(follower);
    }).catch(function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });

  res.status(200);
};

/* 
|--------------------------------------------------------------------------
| Unfollow a user
|--------------------------------------------------------------------------
*/
exports.unfollow = function (req, res) {
  _user2.default.findOne({
    _id: req.params.id
  }).then(function (user) {
    user.unfollow(req.user._id).then(function (follower) {
      //return remaining followers
      user.followers(req.user._id).then(function (followers) {

        console.log("user21=", user._id);
        console.log(" req 2=", req.user._id);
        _user2.default.findOneAndUpdate({ _id: req.user._id }, {
          $pullAll: {
            following: [user._id]
          }
        }, {
          new: true
        }).then(function (user1) {
          console.log("\nunfolow=", user1);
          // if (user) {
          //   return res.status(200).json({
          //     message: "Password Reset Successfully"
          //   });
          // } else {
          //   return res.status(400).json({
          //     'message': 'Invalid Token or Token Expired'
          //   });
          // }
        });

        res.json(followers);
      }).catch(function (err) {
        res.status(422).send(err);
      });
    }).catch(function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err.errors);
  });
};