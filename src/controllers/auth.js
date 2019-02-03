import passport from 'passport';  
import Strategy from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import User from '../models/user';

/* 
|--------------------------------------------------------------------------
| passport strategy - local
|--------------------------------------------------------------------------
*/
export function passportLocalStrategy() {
    passport.use(new Strategy({passReqToCallback: true},
        function(req,username, password, done) {

        User.find({email: username}).then(user => {

            if(user.length) {
              bcrypt.compare(password, user[0].password, function(err, res) {
                if(res) {
                  done(null,user[0])
                } else {
                  done(null, false);
                } 
              });
            }else{
              done(null,false);
            }
            
        }).catch(err => {
          done(null, false);
        });
        
      }
    ));
}

  
/* 
|--------------------------------------------------------------------------
| passport middleware
|--------------------------------------------------------------------------
*/
export function generateToken(req, res, next) {  

	req.token = jwt.sign({
	  _id: req.user._id,
	}, config.auth.secret, {
	  expiresIn: config.auth.expires
	});
	next();
  }
  
export function respond(req, res) {  
	res.status(200).json({
	  user: req.user,
	  token: req.token
	});
  }
  
export function serialize(req, res, next) {  
	db.updateOrCreate(req.user, function(err, user){
	  if(err) {return next(err);}
	  req.user = {
		_id: user._id
	  };
	  next();
	});
  }
  
  const db = {  
	updateOrCreate: function(user, cb){
	  cb(null, user);
	}
  };  