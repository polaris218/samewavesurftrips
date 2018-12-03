'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userUpdateEmail = userUpdateEmail;

var _shopify = require('./shopify');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Update users email
|--------------------------------------------------------------------------
*/
function userUpdateEmail(req, res) {

    var customerId = req.body.customerId;

    var localRes = res;
    console.log(customerId);

    (0, _shopify.put)('/admin/customers/' + customerId + '.json', {
        "customer": {
            "id": customerId,
            "email": req.body.email
        }
    }).then(function (user) {
        if (user.errors) {
            res.render('autologin', { api: _config2.default.app_url, random: Math.round(Math.random() * 1000), layout: 'admin', url: _config2.default.shop_url + '/account/login', customerId: customerId, email: '', error: user.errors.email });
        } else {
            _models2.default['users'].update({ email: req.body.email }, { where: { customerId: customerId } }).then(function (users) {
                console.log(users);
                res.render('autologin', { api: _config2.default.app_url, random: Math.round(Math.random() * 1000), layout: 'admin', url: _config2.default.shop_url + '/account/login', customerId: customerId, email: req.body.email });
            });
        }
    });
}