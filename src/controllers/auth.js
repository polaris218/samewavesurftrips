import passport from 'passport'
import Strategy from 'passport-local'
import CustomStrategy from 'passport-custom'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import config from '../config'
import User from '../models/user'

/* 
|--------------------------------------------------------------------------
| passport strategy - local
|--------------------------------------------------------------------------
*/
export function passportLocalStrategy () {
  passport.use(
    new Strategy({ passReqToCallback: true }, function (
      req,
      username,
      password,
      done
    ) {
      User.find({ email: username })
        .then(user => {
          if (user.length) {
            bcrypt.compare(password, user[0].password, function (err, res) {
              if (res) {
                done(null, user[0])
              } else {
                done(null, false)
              }
            })
          } else {
            done(null, false)
          }
        })
        .catch(err => {
          done(null, false)
        })
    })
  )
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

export function passportFBCustom() {
  passport.use('fb-custom', new CustomStrategy((req, done) => {
    const profile = req.body
    const username = `${profile.id}_facebook`

    //check to see if user already exists
    User.findOne({ username })
      .then(user => {
        // user exists
        if (user) {
          return done(null, user)
        }

        // user doesn't exist - create new user
        const data = {
          username,
          password: process.env.DEFAULT_PASS,
          email: profile.email,
          avatar: profile.picture.data.url,
          first_name: profile.name,
          last_name: profile.name
        };
        User.create(data)
          .then(user => done(null, user))
          .catch(err => done(err, false))

      })
      .catch(err => done(err, false));
  }))
}

/* 
|--------------------------------------------------------------------------
| passport middleware
|--------------------------------------------------------------------------
*/
export function generateToken (req, res, next) {
  req.token = jwt.sign(
    {
      _id: req.user._id
    },
    config.auth.secret,
    {
      expiresIn: config.auth.expires
    }
  )
  next()
}

/* 
|--------------------------------------------------------------------------
| Respond with token
|--------------------------------------------------------------------------
*/
export function respond (req, res) {
  let refreshToken = randtoken.uid(256)
  config.auth.refreshTokens[refreshToken] = req.user._id

  res.status(200).json({
    user: req.user,
    token: req.token,
    refreshToken: refreshToken
  })
}

/* 
|--------------------------------------------------------------------------
| Respond with token - FACEBOOK LOGIN
|--------------------------------------------------------------------------
*/
export function respondFB (req, res) {
  let refreshToken = randtoken.uid(256)
  config.auth.refreshTokens[refreshToken] = req.user._id

  res.redirect(
    `/auth?token=${req.token}&refreshToken=${refreshToken}&user=${req.user._id}`
  )
}

/* 
|--------------------------------------------------------------------------
| Serialize json token
|--------------------------------------------------------------------------
*/
export function serialize (req, res, next) {
  db.updateOrCreate(req.user, function (err, user) {
    if (err) {
      return next(err)
    }
    req.user = {
      _id: user._id
    }
    next()
  })
}

const db = {
  updateOrCreate: function (user, cb) {
    cb(null, user)
  }
}

/* 
|--------------------------------------------------------------------------
| Refresh token.
|--------------------------------------------------------------------------
*/
export function refreshToken (req, res, next) {
  let expiredToken
  let refreshToken = req.body.refreshToken

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    expiredToken = req.headers.authorization.split(' ')[1]
  }

  const user = jwt.verify(expiredToken, config.auth.secret, {
    ignoreExpiration: true
  })

  if (
    refreshToken in config.auth.refreshTokens &&
    config.auth.refreshTokens[refreshToken] == user._id
  ) {
    req.user = user
    delete config.auth.refreshTokens[refreshToken]
    next()
  } else {
    res.status(422).send('Invalid refresh token')
  }
}
