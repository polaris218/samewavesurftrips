'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sync = sync;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _shopify = require('./shopify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var products = _models2.default['products'];
var collections = _models2.default['collections'];
var productViews = _models2.default['productviews'];

/* 
|--------------------------------------------------------------------------
| sync everything
|--------------------------------------------------------------------------
*/
function sync() {
    //sync data ---
    syncProducts();
};

/* 
|--------------------------------------------------------------------------
| sync products
|--------------------------------------------------------------------------
*/
function syncProducts() {
    var _this = this;

    (0, _shopify.get)('/admin/products.json?limit=250').then(function (data) {

        data.products.forEach(function (product) {
            product.views = [];
        });

        productViews.findAll().then(function (views) {

            views.forEach(function (view) {
                var found = data.products.filter(function (prod) {
                    return prod.id == view.productId;
                });

                if (found[0]) found[0].views.push(view);
            }, _this);

            //store product data ---
            products.findOrCreate({ where: { id: 2 }, defaults: { data: JSON.stringify(data) } }).then(function (product) {
                product[0].updateAttributes({ data: JSON.stringify(data) });
            });

            //upload data ---
            uploadProduct(data);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Upload product.json to shopify
|--------------------------------------------------------------------------
*/
function uploadProduct(data) {

    var post_data = {
        "asset": {
            "key": "assets\/products.json.liquid",
            "value": JSON.stringify(data.products)
        }
    };

    (0, _shopify.put)('/admin/themes/' + _config2.default.shopify_themeid + '/assets.json', post_data).then(function (err, data, headers) {
        console.log('Products Synced!');
    });
}