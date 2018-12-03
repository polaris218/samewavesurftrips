'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.put = put;
exports.post = post;

var _shopifyNodeApi = require('shopify-node-api');

var _shopifyNodeApi2 = _interopRequireDefault(_shopifyNodeApi);

var _cache = require('./cache');

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| shopify object
|--------------------------------------------------------------------------
*/
var Shopify = new _shopifyNodeApi2.default({
    shop: _config2.default.shopify_shop,
    shopify_api_key: _config2.default.shopify_apikey,
    access_token: _config2.default.shopify_token,
    verbose: false
});

/* 
|--------------------------------------------------------------------------
| get
|--------------------------------------------------------------------------
*/
function get(url, saveCache) {

    saveCache = saveCache || true;

    return new Promise(function (resolve, reject) {

        if (saveCache == 'false') {
            Shopify.get(url, function (err, resp) {
                resolve(resp);
            });
            return;
        }

        var cache = (0, _cache.getCache)(url, function (data) {
            if (!data) {
                console.log('from shopify API');
                Shopify.get(url, function (err, resp) {
                    (0, _cache.setCache)(url, resp);
                    resolve(resp);
                });
            } else {
                console.log('from cache');
                resolve(data);
            }
        });
    });
}

/* 
|--------------------------------------------------------------------------
| put
|--------------------------------------------------------------------------
*/
function put(url, data) {
    return new Promise(function (resolve, reject) {
        Shopify.put(url, data, function (err, resp) {
            resolve(resp);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| post
|--------------------------------------------------------------------------
*/
function post(url, data) {
    return new Promise(function (resolve, reject) {
        Shopify.post(url, data, function (err, resp) {
            resolve(resp);
        });
    });
}