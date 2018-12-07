import config from '../config';
const ObjectId = require('mongodb').ObjectID;

class Model {

    constructor(args) {
      
    }

    /* 
    |--------------------------------------------------------------------------
    | Save model
    |--------------------------------------------------------------------------
    */
    save(req) {
        let dataModel = {};

        Object.keys(this).forEach((key) => {
            
            Object.keys(req.body).forEach((key2) => {
                if(key == key2) {
                    dataModel[key] = req.body[key2];
                }
            });
    
        });

        return this.publish(req,dataModel);
    }


    /* 
    |--------------------------------------------------------------------------
    | Get all model data
    |--------------------------------------------------------------------------
    */
    getAll(req) {

        const collection = req.db.collection(this.collection);
        const skip = parseInt(req.query.skip) || 0;
        const sort = req.query.sort || '';

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
    get(req) {

        const collection = req.db.collection(this.collection);

        return new Promise((resolve, reject) => {

            collection.find(ObjectId(req.params.id)).toArray((err, resp) => {
                
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