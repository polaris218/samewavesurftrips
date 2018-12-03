'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shipping = shipping;
exports.subscribeUser = subscribeUser;
exports.referUser = referUser;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _shopify = require('./shopify');

var _mailchimpApiV = require('mailchimp-api-v3');

var _mailchimpApiV2 = _interopRequireDefault(_mailchimpApiV);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _email = require('./email');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailchimp = new _mailchimpApiV2.default(_config2.default.mailchimp.mailchimp_api_key);

/* 
|--------------------------------------------------------------------------
| get shipping options
|--------------------------------------------------------------------------
*/
function shipping(req, res) {
    (0, _shopify.get)('/admin/shipping_zones.json').then(function (shippingOptions) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = shippingOptions.shipping_zones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _shipping = _step.value;

                if (_shipping.name == "Domestic") {
                    res.json(_shipping.price_based_shipping_rates);
                }
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
    });
};

/* 
|--------------------------------------------------------------------------
| subscribeUser
|--------------------------------------------------------------------------
*/
function subscribeUser(req, res) {

    if (req.body.email) {
        mailchimp.post('/lists/' + _config2.default.mailchimp.mailchimp_listId + '/members', {
            email_address: req.body.email,
            status: "subscribed"
        }).then(function (results) {
            (0, _email.emailSendSignupOffer)(req.body.email, res);
        }).catch(function (err) {
            console.log(err, 'MAILCHIMP ERROR ---------------------------------------------');
        });
    }

    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| refer a friend
|--------------------------------------------------------------------------
*/
function referUser(req, res, next) {

    if (req.body.email && req.body.emailFriend) {

        _models2.default['referFriend'].findOrCreate({
            defaults: { email: req.body.email, friendsEmail: req.body.emailFriend },
            where: { friendsEmail: req.body.emailFriend }
        }).then(function (data) {
            var wasAdded = data[1];

            if (wasAdded) {
                console.log('sending email');
                (0, _email.emailSendReferFriend)(req.body.email, req.body.emailFriend, res);
            }

            res.send(200);
        });
    }
};