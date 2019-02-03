import express from 'express';
import config from './config';
import expressJwt from 'express-jwt'; 
import passport from 'passport';  
import { passportLocalStrategy, serialize, generateToken, respond } from './controllers/auth';
import Trip from './controllers/trips';
import User from './controllers/users';

const authenticate = expressJwt({secret : config.auth.secret});
let app;


/* 
|--------------------------------------------------------------------------
| Routes Init
|--------------------------------------------------------------------------
*/
export function routesInit(a){
	app = a;

	passportLocalStrategy();
	app.use(passport.initialize());  

} 

/* 
|--------------------------------------------------------------------------
| API V1
|--------------------------------------------------------------------------
*/
const router = express.Router();
export function routes() {


	/* 
	|--------------------------------------------------------------------------
	| Authenticate
	|--------------------------------------------------------------------------
	*/
	router.post('/v1/auth', passport.authenticate(  
	'local', {
		session: false
	}), serialize, generateToken, respond);


	/* 
	|--------------------------------------------------------------------------
	| Home
	|--------------------------------------------------------------------------
	*/
	router.get(`/`, function(req,res){
		res.render('samewave', { 'layout' : 'app' });
	});


	/* 
	|--------------------------------------------------------------------------
	| Sandbox
	|--------------------------------------------------------------------------
	*/
	router.get(`/sandbox`, function(req,res){
		res.render('sandbox', { 'layout' : 'main' });
	});


	/* 
	|--------------------------------------------------------------------------
	| User routes
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/users`, authenticate, User.getAll);
	router.get(`/v1/user/:id`, authenticate, User.get);
	router.post(`/v1/users`, User.create);
	router.get(`/v1/user/:id/follow`, authenticate, User.follow);
	router.get(`/v1/user/:id/unfollow`, authenticate, User.unfollow);

	/* 
	|--------------------------------------------------------------------------
	| Trip routes
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/trips`, authenticate, Trip.getAll);
	router.post(`/v1/trips`, authenticate, Trip.create);

    return router;
}

