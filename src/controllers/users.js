import User from '../models/user'
import aws from 'aws-sdk'
import uuid from 'node-uuid'
import {
  notify_forgot
} from '../controllers/notifications'

function tokenid() {
  let length = 16;
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&*()_+';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

/* 
|--------------------------------------------------------------------------
| Get all users
|--------------------------------------------------------------------------
*/
exports.getAll = (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Get user
|--------------------------------------------------------------------------
*/
exports.get = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Add a user
|--------------------------------------------------------------------------
*/
exports.create = (req, res) => {
  const data = Object.assign({
    username: req.body.email
  }, req.body) || {}

  User.create(data)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
|Forgot Password
|--------------------------------------------------------------------------
*/
exports.forgot = (req, res) => {
  if (!req.body.username || (req.body.username.trim().length == 0)) {
    return res.status(400).json({
      "message": "email is required"
    });
  }

  var token = tokenid();
  const data = Object.assign({resetToken: token, resetPassword: false}) || {};
  let url = 'http://' + req.headers.host + '/reset_password?token=' + token;

  User.findOneAndUpdate({
      username: req.body.username
    }, data, {
      new: true
    }).then(user => {
      if(user){
        notify_forgot(user, url);
        return res.status(200).json({
          'message': 'Mail Sent to your email id :' + req.body.username
        });
      }else{
        return res.status(400).json({
          'message': 'Invalid Email :'
        });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

/* 
|--------------------------------------------------------------------------
|Reset Password Password
|--------------------------------------------------------------------------
*/
exports.resetPassword = (req, res) => {

  if (!req.body.token || (req.body.token.trim().length == 0)) {
    return res.status(400).json({
      "message": "token field is required"
    });
  }
  if (!req.body.password || (req.body.password.trim().length == 0)) {
    return res.status(400).json({
      "message": "password field is required"
    });
  }
  var token = req.body.token.trim();
  var pass = req.body.password.trim();
  const match = Object.assign({
    resetToken: token,
    resetPassword: false
  });
  const data1 = Object.assign({
    password: pass,
    resetPassword: true,
    resetToken: ""
  });

  User.findOneAndUpdate(match, data1, {
      new: true
    }).then(user => {
      res.status(200).json({
        message: "Password reset Successfully"
      });
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
| Update user
|--------------------------------------------------------------------------
*/
exports.update = (req, res) => {
  const data = Object.assign({}, req.body) || {}

  User.findOneAndUpdate({
      _id: req.user._id
    }, data, {
      new: true
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

/* 
|--------------------------------------------------------------------------
| Display avatar
|--------------------------------------------------------------------------
*/
exports.getAvatar = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      const url = `https://${process.env.S3_BUCKET}.${process.env
        .DO_ENDPOINT_CDN}/${user.avatar}`

      res.send(url)
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Display cover image
|--------------------------------------------------------------------------
*/
exports.getCover = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      const url = `https://${process.env.S3_BUCKET}.${process.env
        .DO_ENDPOINT_CDN}/${user.cover_image}`

      res.send(url)
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Update avatar
|--------------------------------------------------------------------------
*/
exports.avatar = (req, res) => {
  User.findOne({
      _id: req.user._id
    })
    .then(user => {
      user.updateAvatar(req.files.avatar).then(file => {
        res.json(file)
      })
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Cover Image
|--------------------------------------------------------------------------
*/
exports.coverImage = (req, res) => {
  User.findOne({
      _id: req.user._id
    })
    .then(user => {
      user.updateCover(req.files.cover).then(file => {
        res.json(file)
      })
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}

/* 
|--------------------------------------------------------------------------
| Get followers
|--------------------------------------------------------------------------
*/
exports.followers = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      user
        .followers(req.user._id)
        .then(follower => {
          res.json(follower)
        })
        .catch(err => {
          res.status(422).send(err)
        })
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })

  res.status(200)
}

/* 
|--------------------------------------------------------------------------
| Follow a user
|--------------------------------------------------------------------------
*/
exports.follow = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      user
        .follow(req.user._id)
        .then(follower => {
          res.json(follower)
        })
        .catch(err => {
          res.status(422).send(err)
        })
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })

  res.status(200)
}

/* 
|--------------------------------------------------------------------------
| Unfollow a user
|--------------------------------------------------------------------------
*/
exports.unfollow = (req, res) => {
  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      user
        .unfollow(req.user._id)
        .then(follower => {
          //return remaining followers
          user
            .followers(req.user._id)
            .then(followers => {
              res.json(followers)
            })
            .catch(err => {
              res.status(422).send(err)
            })
        })
        .catch(err => {
          res.status(422).send(err)
        })
    })
    .catch(err => {
      res.status(422).send(err.errors)
    })
}