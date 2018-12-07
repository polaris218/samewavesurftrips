import Model from './model';
import bcrypt from 'bcrypt';

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
 */


/* 
|--------------------------------------------------------------------------
| User model
|--------------------------------------------------------------------------
*/
class User extends Model {
    
    /* 
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */
    constructor(args){
        super(args);
        this.collection = 'users';
    }


    /* 
    |--------------------------------------------------------------------------
    | Model properties
    |--------------------------------------------------------------------------
    */
    first_name = {
        secret: false,
        allowNull: true
    }

    last_name = {
        secret: false,
        allowNull: true
    }

    email = {
        secret: true,
        allowNull: false
    }

    password = {
        secret: true,
        allowNull: false
    }

   
    /* 
    |--------------------------------------------------------------------------
    | Publish
    |--------------------------------------------------------------------------
    */
    publish(req,data) {
        return new Promise((resolve, reject) => {

            const collection = req.db.collection(this.collection);
        
            bcrypt.hash(data.password, 10, function(err, hash) {
                data.password = hash;
        
                collection.insert(data, function(err, records){
                    if(err){
                        reject(err)
                    }else{
                        resolve(records)
                    }
                });
            }); 

        });
    }

}

export { User };