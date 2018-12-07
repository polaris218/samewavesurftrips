import express from 'express';
import config from './config';
import expressJwt from 'express-jwt'; 
import passport from 'passport';  
import { passportLocalStrategy, serialize, generateToken, respond } from './controllers/auth';
import { users, user, userAdd } from './controllers/users';

const authenticate = expressJwt({secret : config.hash.secret});
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


	/**
	 * @api {post} /auth Request Auth Token
	 * @apiName RequestToken
	 * @apiGroup Auth
	 * 
	 * @apiParam {String} email Email / password of user account
	 * @apiParam {String} password Password of user account
	 *
	 * @apiSuccess {String}   _id   id of authenticated user account
	 * @apiSuccess {String} token Authentication token
	 */
	router.post('/v1/auth', passport.authenticate(  
	'local', {
		session: false
	}), serialize, generateToken, respond);


	/* 
	|--------------------------------------------------------------------------
	| HOME
	|--------------------------------------------------------------------------
	*/
	router.get(`/`, authenticate, function(req,res){
		res.json({ 'msg' : 'Hello World!' })
	});


	/* 
	|--------------------------------------------------------------------------
	| USERS
	|--------------------------------------------------------------------------
	*/
	router.get(`/v1/users`, users);
	router.get(`/v1/user/:id`, user);
	router.post(`/v1/users`, userAdd);

    return router;
}

