'use strict';

var config = {

    /* 
    |--------------------------------------------------------------------------
    | domain
    |--------------------------------------------------------------------------
    */
    domain: 'samewave.herokuapp.com',

    /* 
    |--------------------------------------------------------------------------
    | api
    |--------------------------------------------------------------------------
    */
    api: {
        version: 1
    },

    /* 
    |--------------------------------------------------------------------------
    | mailgun
    |--------------------------------------------------------------------------
    */
    mailgun: {
        key: 'key-588560d6e7aa67c1da8dba071ac6a59e',
        domain: 'freemandigital.com',
        from: 'Luke Freeman <hello@freemandigital.com>',
        admin: 'Luke Freeman <luke@freemandigital.com>'
    },

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
    },

    /* 
    |--------------------------------------------------------------------------
    | authentication
    |--------------------------------------------------------------------------
    */
    auth: {
        secret: process.env.HASH_SECRET,
        expires: 12000,
        refreshTokens: {},
        facebook_app_id: 2088909384739906,
        facebook_app_secret: 'd6cbfd94bbd61b848d491eb197a231d8'
    }
};

module.exports = config;