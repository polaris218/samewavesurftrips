'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.discountCheck = discountCheck;
exports.paypalDiscount = paypalDiscount;

var _shopify = require('./shopify');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  
|--------------------------------------------------------------------------
| Check discount code
|--------------------------------------------------------------------------
*/
function discountCheck(req, res) {

    var msg = void 0;

    (0, _shopify.get)('/admin/price_rules.json').then(function (data) {

        var discount = data.price_rules.filter(function (rule) {
            return rule.title == req.query.code.toUpperCase();
        })[0];

        if (discount) {
            //check start date ---
            if (discount.starts_at) {
                var start = (0, _moment2.default)(discount.starts_at).format('DD-MM-YYYY');
                if ((0, _moment2.default)(start, 'DD-MM-YYYY').isAfter((0, _moment2.default)())) {
                    discount = null;
                }
            }
        }

        if (discount) {
            //check end date ---
            if (discount.ends_at) {
                var ends = (0, _moment2.default)(discount.ends_at).format('DD-MM-YYYY');

                if ((0, _moment2.default)(ends, 'DD-MM-YYYY').isBefore((0, _moment2.default)())) {
                    discount = null;
                    msg = 'This discount has expired';
                }
            }
        }

        //if code requires minimum purchase amount check values ---
        if (discount) {
            if (discount.prerequisite_subtotal_range) {
                if (discount.prerequisite_subtotal_range.greater_than_or_equal_to) {
                    if (parseFloat(req.query.subtotal) < parseFloat(discount.prerequisite_subtotal_range.greater_than_or_equal_to)) {
                        msg = 'This discount requires a minimum spend of £' + discount.prerequisite_subtotal_range.greater_than_or_equal_to;
                        discount = null;
                    }
                }
            }
        }

        var msg = msg || 'Sorry not a valid code',
            value_type = '',
            target_type = discount ? discount.target_type : '';

        switch (target_type) {
            case 'shipping_line':
                msg = 'Thanks! Free Shipping will be applied after you checkout.';
                break;

            case 'line_item':
                msg = discount.value_type == 'percentage' ? 'Thanks! ' + discount.value.replace('-', '') + '% discount will be applied after you checkout' : 'Thanks! £' + discount.value.replace('-', '') + ' discount will be applied after you checkout';
                break;
        }

        res.json(msg);
    });
}

/*  
|--------------------------------------------------------------------------
| Validate Paypal discount
|--------------------------------------------------------------------------
*/
function paypalDiscount(cart, subtotal, shippingCost, code) {

    return new Promise(function (resolve, reject) {

        //return if no code given ---
        if (!code) {
            resolve(false);return;
        }

        (0, _shopify.get)('/admin/price_rules.json').then(function (data) {

            var discount_code = void 0,
                total_amount = void 0,
                shipping_discount = false;

            //extract code details ---
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.price_rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var discount = _step.value;

                    if (discount.title == code.toUpperCase()) discount_code = discount;
                }

                //return if no code found ---
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

            if (!discount_code) {
                resolve(false);return;
            }

            //check start date ---
            if (discount_code.starts_at) {
                var start = (0, _moment2.default)(discount_code.starts_at).format('DD-MM-YYYY');

                if ((0, _moment2.default)(start, 'DD-MM-YYYY').isAfter((0, _moment2.default)())) {
                    resolve(false);
                    return;
                }
            }

            //check end date ---
            if (discount_code.ends_at) {
                var ends = (0, _moment2.default)(discount_code.ends_at).format('DD-MM-YYYY');
                if ((0, _moment2.default)(ends, 'DD-MM-YYYY').isBefore((0, _moment2.default)())) {
                    resolve(false);
                    return;
                }
            }

            //if code requires minimum purchase amount check values ---
            if (discount_code.prerequisite_subtotal_range) {
                if (discount_code.prerequisite_subtotal_range.greater_than_or_equal_to) {
                    if (parseFloat(subtotal) < parseFloat(discount_code.prerequisite_subtotal_range.greater_than_or_equal_to)) discount_code = null;
                    if (!discount_code) {
                        resolve(false);return;
                    }
                }
            }

            //workout value
            total_amount = discount_code.value_type == 'percentage' ? subtotal / 100 * discount_code.value : discount_code.value;

            //check if shipping discount ---
            if (discount_code.target_type == 'shipping_line') {
                shipping_discount = true;
                total_amount = -shippingCost;
            }

            //check usage ---
            _models2.default['paypal'].count({ where: { discountcode: code } }).then(function (count) {
                if (discount_code.usage_limit) {
                    if (count >= discount_code.usage_limit) discount_code = null;
                    if (!discount_code) {
                        resolve(false);return;
                    }
                }

                resolve({
                    code: code,
                    total: total_amount,
                    shipping_discount: shipping_discount,
                    type: shipping_discount ? 'shipping' : discount_code.value_type,
                    value: discount_code.value
                });

                return;
            });
        }).catch(function (err) {
            console.log(err);
        });
    });
}