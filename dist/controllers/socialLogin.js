'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socialLogin = require('social-login');

var _socialLogin2 = _interopRequireDefault(_socialLogin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _shopify = require('./shopify');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _fbgraph = require('fbgraph');

var _fbgraph2 = _interopRequireDefault(_fbgraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var socialLogin = void 0;

var SocialLogin = function () {
    function SocialLogin(args) {
        _classCallCheck(this, SocialLogin);

        this.app = args.app || {};
        this.type;
        this.profile;
        this.token;
        this.secret;
        this.uniqueProperty;
        this.password;
        this.init();
    }

    /* 
    |--------------------------------------------------------------------------
    | INIT SOCIAL LOGIN
    |--------------------------------------------------------------------------
    */


    _createClass(SocialLogin, [{
        key: 'init',
        value: function init() {

            socialLogin = new _socialLogin2.default({
                app: this.app,
                url: _config2.default.app_url,
                onAuth: this.handleTokens.bind(this)
            });

            socialLogin.use({
                twitter: {
                    settings: {
                        clientID: _config2.default.twitter.clientID,
                        clientSecret: _config2.default.twitter.clientSecret
                    },
                    url: {
                        auth: "/auth/twitter",
                        callback: "/auth/callback",
                        success: '/auth/success',
                        fail: '/auth/fail'
                    }
                },

                facebook: {
                    settings: {
                        clientID: _config2.default.facebook.appId,
                        clientSecret: _config2.default.facebook.secret,
                        authParameters: {
                            scope: 'email,public_profile'
                        }
                    },
                    url: {
                        auth: "/auth/facebook", // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
                        callback: "/auth/facebook/callback", // The Oauth callback url as specified in your facebook app's settings
                        success: '/auth/success', // Where to redirect the user once he's logged in
                        fail: '/auth/facebook/fail' // Where to redirect the user if the login failed or was canceled.
                    }
                }
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | ROUTE LOGIN
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'routeLogin',
        value: function routeLogin(type, req, res) {
            switch (type) {
                case 'twitter':
                    res.redirect('/auth/twitter');
                    break;

                case 'facebook':
                    res.redirect('/auth/facebook');
                    break;
            }
        }

        /* 
        |--------------------------------------------------------------------------
        | HANDLE TOKENS
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'handleTokens',
        value: function handleTokens(req, type, uniqueProperty, accessToken, tokenSecret, profile, done) {
            var _this = this;

            this.type = type;
            this.profile = profile;
            this.uniqueProperty = uniqueProperty;
            this.token = accessToken;
            this.secret = tokenSecret;

            switch (this.type) {
                case 'twitter':
                    this.twitter(req).then(function (user) {
                        _this.createShopifyUser(user, function (updatedUser) {
                            done(null, updatedUser);
                        });
                    });
                    break;

                case 'facebook':
                    this.facebook(req).then(function (user) {
                        _this.createShopifyUser(user, function (updatedUser) {
                            console.log(updatedUser, 'UPDATED USER');
                            done(null, updatedUser);
                        });
                    });
                    break;
            }
        }

        /* 
        |--------------------------------------------------------------------------
        | HANDLE FACEBOOK LOGIN
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'facebook',
        value: function facebook(req) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _fbgraph2.default.setAccessToken(_this2.token);

                _fbgraph2.default.get("/me?fields=id,name,email", function (err, res) {
                    _this2.findCreateUser(req, res).then(function (user) {
                        resolve(user);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | HANDLE TWITTER LOGIN
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'twitter',
        value: function twitter(req) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var client = new _twitter2.default({
                    consumer_key: _config2.default.twitter.clientID,
                    consumer_secret: _config2.default.twitter.clientSecret,
                    access_token_key: _this3.token,
                    access_token_secret: _this3.secret
                });

                client.get('account/verify_credentials', { include_email: true }, function (error, response) {
                    _this3.findCreateUser(req, response).then(function (user) {
                        resolve(user);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | FIND / CREATE USER
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'findCreateUser',
        value: function findCreateUser(req, response) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                _this4.email = response.email || Math.random().toString(36).slice(-8) + '@app.allgoodthings.uk.com';

                //save access token / secret in session ---
                req.session.auth = {
                    access_token: _this4.token,
                    email: _this4.email
                };

                _models2.default['users'].findOrCreate({
                    defaults: { profile: JSON.stringify(_this4.profile), property: _this4.uniqueProperty, type: _this4.type, email: _this4.email, token: _this4.token, secret: _this4.secret },
                    where: { email: _this4.email }
                }).then(function (user) {
                    resolve(user);
                }).catch(function (reason) {
                    console.log(reason);
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | CREATE SHOPIFY ACCOUNT
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'createShopifyUser',
        value: function createShopifyUser(user, callback) {
            var _this5 = this;

            (0, _shopify.get)('/admin/customers/search.json?query=email:' + user[0].dataValues.email).then(function (shopifyUser) {

                //generate a random password ---
                var password = Math.random().toString(36).slice(-8);

                //user exists lets refresh password and login ---
                if (shopifyUser.customers.length > 0) {

                    _models2.default['users'].update({ password: password, token: _this5.token }, { where: { customerId: shopifyUser.customers[0].id } }).then(function (user) {
                        (0, _shopify.put)('/admin/customers/' + shopifyUser.customers[0].id + '.json', {
                            "customer": {
                                "id": parseInt(shopifyUser.customers[0].id),
                                "password": password,
                                "password_confirmation": password
                            }
                        }).then(function (user) {
                            callback(user);
                        });
                    });
                } else {

                    //user doesnt exsits so create --- 
                    var customer = {
                        "customer": {
                            "first_name": "",
                            "last_name": "",
                            "email": user[0].dataValues.email,
                            "verified_email": true,
                            "password": '' + password,
                            "password_confirmation": '' + password,
                            "send_email_welcome": true
                        }
                    };

                    (0, _shopify.post)('/admin/customers.json', customer).then(function (newUser) {
                        _models2.default['users'].update({ customerId: newUser.customer.id, password: password }, { where: { email: user[0].dataValues.email } }).then(function (user) {
                            callback(user);
                        });
                    });
                }
            });
        }
    }]);

    return SocialLogin;
}();

exports.default = SocialLogin;