
class Model {

    constructor(args) {
      
    }

    set(data) {
        let dataModel = {};

        Object.keys(this).forEach(function(key) {
            
            Object.keys(data).forEach(function(key2) {
                if(key == key2) {
                    dataModel[key] = data[key2];
                }
            });
    
        });
    
        return dataModel;
    }

}

export default Model;