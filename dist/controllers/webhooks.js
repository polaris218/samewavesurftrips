'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webhookProductUpdate = webhookProductUpdate;
exports.webhookProductDelete = webhookProductDelete;
exports.webhookOrderCreated = webhookOrderCreated;
exports.webhookUserCreated = webhookUserCreated;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _shopify = require('./shopify');

var _tracking = require('./tracking');

var _search = require('./search');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _email = require('./email');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| verify webhooks
|--------------------------------------------------------------------------
*/
function verifyShopifyHook(req) {
    var digest = _crypto2.default.createHmac('SHA256', _config2.default.shopify_webhook_secret).update(new Buffer(req.rawBody, 'utf8')).digest('base64');

    return digest === req.headers['x-shopify-hmac-sha256'];
}

/* 
|--------------------------------------------------------------------------
| Product updated / create
|--------------------------------------------------------------------------
*/
function webhookProductUpdate(req, res) {
    if (verifyShopifyHook(req)) {
        (0, _tracking.createUpdateProduct)(req.body);
        (0, _search.sync)();
    }
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| Product delete
|--------------------------------------------------------------------------
*/
function webhookProductDelete(req, res) {
    if (verifyShopifyHook(req)) {
        (0, _tracking.deleteProduct)(req.body);
        (0, _search.sync)();
    }
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| Order created
|--------------------------------------------------------------------------
*/
function webhookOrderCreated(req, res) {
    if (verifyShopifyHook(req)) {
        (0, _email.emailSendNewOrder)(res);
    }
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| User created
|--------------------------------------------------------------------------
*/
function webhookUserCreated(req, res) {
    if (verifyShopifyHook(req)) {
        //do summat... 
    }
    res.send(200);
};