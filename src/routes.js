import express from 'express';
import config from './config';
import { users, user, userAdd } from './controllers/users';

let app;
const basepath = `v${config.api.version}`;

console.log(basepath);

/* 
|--------------------------------------------------------------------------
| Routes Init
|--------------------------------------------------------------------------
*/
export function routesInit(a){
	app = a;
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
	| HOME
	|--------------------------------------------------------------------------
	*/
	router.get(`/`, function(req,res){
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

