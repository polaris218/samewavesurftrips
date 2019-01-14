import Model from './model';
import bcrypt from 'bcrypt';
import Joi from 'joi';

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
        validation: Joi.string().alphanum().min(1).max(50).required()
    }

    last_name = {
        secret: false,
        validation: Joi.string().alphanum().min(1).max(50).required()
    }

    email = {
        secret: false,
        validation: Joi.string().email({ minDomainAtoms: 2 })
    }

    password = {
        secret: true,
        validation: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }



    /* 
    |--------------------------------------------------------------------------
    | Publish
    |--------------------------------------------------------------------------
    */
    publish(data) {

        return new Promise((resolve, reject) => {

            const collection = this.req.db.collection(this.collection);
        
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

    /* 
    |--------------------------------------------------------------------------
    | Check user exists
    |--------------------------------------------------------------------------
    */
    doesNotExists() {

        return new Promise((resolve, reject) => {

            const collection = this.req.db.collection(this.collection);
            const email = this.req.body.email;

            collection.find({email}).toArray((err, resp) => {   

                if(resp.length > 0){
                    reject();
                }else {
                    resolve();
                }
            
            });

        });


    }

}

export { User };