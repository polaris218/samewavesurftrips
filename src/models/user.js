import Model from './model';

/* 
|--------------------------------------------------------------------------
| API Docs
|--------------------------------------------------------------------------
*/
/**
 * @apiDefine UserObject
 * @apiSuccess {String}   _id   Unique id.
 * @apiSuccess {String}   first_name   First Name.
 * @apiSuccess {String}   last_name   Last Name.
 * @apiSuccess {String}   email   Email address.
 */


/* 
|--------------------------------------------------------------------------
| User model
|--------------------------------------------------------------------------
*/
class User extends Model {

    first_name = "";
    last_name = "";
    email = "";

    constructor(args){
        super(args);
    }

}

export { User };