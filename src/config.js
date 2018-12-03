var config = {

    domain: 'samewave.herokuapp.com',

    /* 
    |--------------------------------------------------------------------------
    | mongoDB
    |--------------------------------------------------------------------------
    */
    db: {
        user: "samewave",
        password: process.env.DB_PASS,
        database: "heroku_tvhqf9rt",
        host: "ds155252.mlab.com",
        port: 55252,
        paging: 25
    }
}

module.exports = config;
