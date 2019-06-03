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
    from: 'Samewave Surf Trips <info@samewavesurftrips.com>',
    admin: 'Luke Freeman <luke@freemandigital.com>'
  },

  /* 
    |--------------------------------------------------------------------------
    | mongoDB
    |--------------------------------------------------------------------------
    */
  db: {
    user: 'samewave',
    password: process.env.DB_PASS,
    database: 'heroku_tvhqf9rt',
    host: 'ds155252.mlab.com',
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
    facebook_app_id: 161223164770911,
    facebook_app_secret: '4126df8dee5e14888f1ce86e03d368e1'
  }
};

module.exports = config;