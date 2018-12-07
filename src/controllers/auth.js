import passport from 'passport';  
import Strategy from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

/* 
|--------------------------------------------------------------------------
| passport strategy - local
|--------------------------------------------------------------------------
*/
export function passportLocalStrategy() {
    passport.use(new Strategy({passReqToCallback: true},
        function(req,username, password, done) {
    
        const collection = req.db.collection('users');
        
        collection.find({email: username}).toArray(function(err, user) {
    
            const userObject = user[0];
    
            bcrypt.compare(password, userObject.password, function(err, res) {
                if(res) {
                done(null,userObject)
                } else {
                done(null, false);
                } 
            });
    
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
	  id: req.user.id,
	}, config.hash.secret, {
	  expiresIn: 120
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