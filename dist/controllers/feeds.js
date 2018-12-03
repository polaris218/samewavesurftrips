'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.productFeed = productFeed;
exports.awinProductFeed = awinProductFeed;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _jsontoxml = require('jsontoxml');

var _jsontoxml2 = _interopRequireDefault(_jsontoxml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| product feed
|--------------------------------------------------------------------------
*/
function productFeed(req, res) {
    _models2.default['products'].findAll({ raw: true }).then(function (product) {

        var products = [],
            json = JSON.parse(product[0].data.toString('utf8')),
            xml = void 0,
            response = void 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = json.products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _product = _step.value;

                products.push({ product: _product });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        json = JSON.stringify({ AGT: products });
        res.json(json);
    });
}

/* 
|--------------------------------------------------------------------------
| awin product feed
|--------------------------------------------------------------------------
*/
function awinProductFeed(req, res) {
    _models2.default['products'].findAll().then(function (product) {

        var products = [],
            json = JSON.parse(product[0].data.toString('utf8')),
            xml = '';

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = json.products[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _product2 = _step2.value;

                var image = _product2.images[0] ? _product2.images[0].src : '';
                xml += '<product>\n                        <pid>' + _product2.id + '</pid>\n                        <name>' + _product2.title + '</name>\n                        <desc>' + _product2.body_html + '</desc>\t\n                        <imgurl>' + image + '</imgurl>\n                        <category>Women\'s Clothing</category>\n                        <purl>' + _config2.default.shop_url + '/products/' + _product2.handle + '</purl>\n                        <price>\n                            <actualp>' + _product2.variants[0].price + '</actualp>\n                        </price>\n                    </product>';
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        res.set('Content-Type', 'text/xml');
        res.send('<?xml version="1.0" encoding="UTF-8"?>\n                    <!DOCTYPE merchant SYSTEM "http://www.affiliatewindow.com/DTD/affiliate/datafeed.1.5.dtd">\n                    <merchant>' + xml + '</merchant>');
    });
}