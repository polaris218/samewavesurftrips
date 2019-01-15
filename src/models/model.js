import config from '../config';
import Joi from 'joi';
const ObjectId = require('mongodb').ObjectID;

class Model {
    /* 
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */
    constructor(args) {
        this.req = args;
    }

    /* 
    |--------------------------------------------------------------------------
    | Model properties
    |--------------------------------------------------------------------------
    */
    created_at = {
        secret: false,
        validation: Joi.string().required()
    }

    /* 
    |--------------------------------------------------------------------------
    | Validate data object
    |--------------------------------------------------------------------------
    */
    validate(data) {

        let validationKeys = {}

        Object.keys(this).forEach((key) => {
            
            Object.keys(data).forEach((key2) => {
                if(key == key2) {
                    validationKeys[key] = this[key2].validation;
                }
            });
    
        });

        let schema = Joi.object().keys(validationKeys);

        const result = Joi.validate(data, schema);
        
        return result;
    }

    /* 
    |--------------------------------------------------------------------------
    | Save model
    |--------------------------------------------------------------------------
    */
    save() {

        let dataModel = {
            created_at: Date.now().toString()
        };
       
        Object.keys(this).forEach((key) => {
            
            Object.keys(this.req.body).forEach((key2) => {
                if(key == key2) {
                    dataModel[key] = this.req.body[key2];
                }
            });
    
        });

        const validData = this.validate(dataModel);

        if(validData.error){
            return new Promise((resolve, reject) => {
                reject(validData);
            });
        }else{
            return this.publish(dataModel);
        }
        
    }


    /* 
    |--------------------------------------------------------------------------
    | Get all model data
    |--------------------------------------------------------------------------
    */
    getAll() {

        const collection = this.req.db.collection(this.collection);
        const skip = parseInt(this.req.query.skip) || 0;
        const sort = this.req.query.sort || '';

        return new Promise((resolve, reject) => {
            
            collection.count().then(total=>{
                const pages = Math.ceil(total / config.db.paging);
                
                collection.find().skip(skip).limit(config.db.paging).sort({sort: -1}).toArray((err, resp) => {

                    let data = this.maskPrivate(resp);
                    
                    if(err){
                        reject(err)
                    }else{
                        resolve({pages,data})
                    }
                
                });
            });

        });

    }

    /* 
    |--------------------------------------------------------------------------
    | Get single model by id
    |--------------------------------------------------------------------------
    */
    get() {

        const collection = this.req.db.collection(this.collection);

        return new Promise((resolve, reject) => {

            collection.find(ObjectId(this.req.params.id)).toArray((err, resp) => {
                
                let data = this.maskPrivate(resp);

                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            });

        });

    }

    /* 
    |--------------------------------------------------------------------------
    | Mask private fields
    |--------------------------------------------------------------------------
    */
    maskPrivate(data){
        
        if(Array.isArray(data)){
            return data.map(item => {
                Object.keys(item).forEach((key) => {
                    if(this[key]){
                        if(this[key]['secret']) delete item[key];
                    }
                });

                return item;
            })
        }

        if(!Array.isArray(data)){
            Object.keys(data).forEach((key) => {
                if(this[key]){
                    if(this[key]['secret']) delete data[key];
                }
            });

            return data;
        }
        
    }

}

export default Model;