import express from 'express';
import config from './config';
import expressJwt from 'express-jwt'; 
import passport from 'passport';  
import { passportLocalStrategy, serialize, generateToken, respond, respondFB, refreshToken, passportFBStrategy} from './controllers/auth';
import Trip from './controllers/trips';
import User from './controllers/users';
import Message from './controllers/messages';

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
	passportFBStrategy();

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
	| Authenticate Local
	|--------------------------------------------------------------------------
	*/
	router.post('/v1/auth', passport.authenticate('local', {
		session: false
	}), serialize, generateToken, respond);

	
	/* 
	|--------------------------------------------------------------------------
	| Authenticate Facebook
	|--------------------------------------------------------------------------
	*/
	router.get('/v1/auth/facebook', passport.authenticate('facebook', {
		session: false
	}), serialize, generateToken, respond);

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		session: false
	}), serialize, generateToken, respondFB);


	/* 
	|--------------------------------------------------------------------------
	| Refresh token
	|--------------------------------------------------------------------------
	*/
	router.post('/v1/token', refreshToken, serialize, generateToken, respond);

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
	router.put(`/v1/user`, authenticate, User.update);
	router.post(`/v1/user/avatar`, authenticate, User.avatar);
	router.post(`/v1/user/cover`, authenticate, User.coverImage);
	router.get(`/v1/user/:id/avatar`, User.getAvatar);
	router.get(`/v1/user/:id/cover`, User.getCover);
	router.get(`/v1/user/:id/follow`, authenticate, User.follow);
	router.get(`/v1/user/:id/unfollow`, authenticate, User.unfollow);
	router.get(`/v1/user/:id/followers`, authenticate, User.followers);

	/* 
	|--------------------------------------------------------------------------
	| Trip routes
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/trips`, authenticate, Trip.getAll);
	router.get(`/v1/trips/:userid`, authenticate, Trip.getUserTrips);
	router.post(`/v1/trips`, authenticate, Trip.create);
	router.put(`/v1/trip/:id`, authenticate, Trip.update);
	router.delete(`/v1/trip/:id`, authenticate, Trip.delete);
	router.get(`/v1/trip/:id/join`, authenticate, Trip.join);
	router.get(`/v1/trip/:id/leave`, authenticate, Trip.leave);
	//router.get(`/v1/trips/geocode`, Trip.geocode); 
	

	/* 
	|--------------------------------------------------------------------------
	| Search trips
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/search/trips`, Trip.search);
	router.get(`/v1/search/destination`, Trip.searchDestination);

	/* 
	|--------------------------------------------------------------------------
	| Message routes
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/messages`, authenticate, Message.getAll);
	router.post(`/v1/messages`, authenticate, Message.create);
	router.delete(`/v1/messages/:id`, authenticate, Message.delete);

	/* 
	|--------------------------------------------------------------------------
	| Home
	|--------------------------------------------------------------------------
	*/
	router.get(`*`, function(req,res){
		res.render('samewave', { 'layout' : 'app' });
	});

    return router;
}

