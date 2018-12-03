import schedule from 'node-schedule';

class Cronjob {

    constructor(){
        console.log('Cron Running!\n---------------------------------------------------');
        this.createJobs()
        
    }

    createJobs(){

        /*  
        |--------------------------------------------------------------------------
        | run every 10mins... 
        |--------------------------------------------------------------------------
        */
        schedule.scheduleJob('*/10 * * * *', function(){
           
        });

        /*  
        |--------------------------------------------------------------------------
        | run at 7am every day - UTC time so 1hr behind
        |--------------------------------------------------------------------------
        */
        schedule.scheduleJob({hour: 6, minute: 0}, function(){
            
        });

        /*  
        |--------------------------------------------------------------------------
        | run at 16:00 every day - UTC time so 1hr behind
        |--------------------------------------------------------------------------
        */
        schedule.scheduleJob({hour: 15, minute: 0}, function(){
           
        });
        
    }
}  

new Cronjob();