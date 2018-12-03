'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paypalComplete = paypalComplete;
exports.paypalSend = paypalSend;

var _paypalRestSdk = require('paypal-rest-sdk');

var _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk);

var _shopify = require('./shopify');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _discount = require('./discount');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_paypalRestSdk2.default.configure({
    'mode': _config2.default.paypal.mode,
    'client_id': _config2.default.paypal.client_id,
    'client_secret': _config2.default.paypal.client_secret
});

/* 
|--------------------------------------------------------------------------
| paypal execute payment
|--------------------------------------------------------------------------
*/
function _executePayment(paymentId, payerId, res) {
    _paypalRestSdk2.default.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
            console.error(JSON.stringify(error));
        } else {
            if (payment.state == 'approved') {

                //update db with transaction details ---
                _models2.default['paypal'].update({ completed: 'true', payerId: payerId.payer_id, email: payment.payer.payer_info.email, customer: JSON.stringify(payment.payer.payer_info) }, { where: { paypalId: paymentId } }).then(function () {
                    //create order with shopify ---
                    _createShopifyOrder(paymentId, res);
                });
            } else {
                res.send('Payment declined!!');
            }
        }
    });
}

/* 
|--------------------------------------------------------------------------
| paypal complete callback
|--------------------------------------------------------------------------
*/
function paypalComplete(req, res) {
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };

    _models2.default['paypal'].findAll({ where: {
            paypalId: paymentId
        }, raw: true }).then(function (order) {
        var discount = order[0].discountcode;

        if (discount == '') {
            _executePayment(paymentId, payerId, res);
        } else {
            //check if discount has already been used ---
            _models2.default['paypal'].findAll({ where: {
                    discountcode: discount,
                    payerId: payerId.payer_id
                }, raw: true }).then(function (discount_used) {
                if (!discount_used.length) {
                    _executePayment(paymentId, payerId, res);
                } else {
                    var transaction = JSON.parse(order[0].transaction);
                    var isDelivery = order[0].shipping_type != 'click-collect' ? true : false;
                    res.render('discountUsed', { layout: 'main', shipping_cost: order[0].shipping, isDelivery: isDelivery, shipping: transaction[0].item_list.shipping_address, store_id: order[0].storeId, cart: order[0].cart, shipping_desc: order[0].shipping_desc, shipping_type: order[0].shipping_type });
                }
            });
        }
    });
}

/* 
|--------------------------------------------------------------------------
| create shopify order
|--------------------------------------------------------------------------
*/
function _createShopifyOrder(id, res) {

    _models2.default['paypal'].findAll({ where: {
            paypalId: id
        }, raw: true }).then(function (order) {

        var line_items = [],
            cart = JSON.parse(order[0].cart.toString('utf8')),
            customer = JSON.parse(order[0].customer.toString('utf8')),
            shipping_address = customer.shipping_address,
            shipping_price = order[0].shipping,
            shipping_desc = order[0].shipping_desc.split(" - ")[0],
            shippingType = order[0].shipping_type;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = cart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                line_items.push({
                    product_id: parseInt(item.productId),
                    variant_id: parseInt(item.variantId),
                    quantity: parseInt(item.quantity)
                });
            }

            //create order notes ---
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

        var notes = [{ "name": "shipping_type", "value": shippingType }];
        if (order[0].storeId) notes.push({ "name": "store_id", "value": order[0].storeId });

        var orderJSON = {
            "order": {
                "email": customer.email,
                "send_receipt": true,
                "send_fulfillment_receipt": true,
                "line_items": line_items,
                "transactions": [{
                    "kind": "sale",
                    "status": "success",
                    "amount": order[0].total
                }],
                "shipping_address": {
                    "address1": shipping_address.line1,
                    "address2": shipping_address.line2,
                    "city": shipping_address.city,
                    "zip": shipping_address.postal_code,
                    "name": shipping_address.recipient_name,
                    "country_code": shipping_address.country_code
                },

                "shipping_lines": [{
                    "code": shipping_desc,
                    "price": parseFloat(shipping_price),
                    "source": "shopify",
                    "title": shipping_desc,
                    "carrier_identifier": null,
                    "requested_fulfillment_service_id": null
                }],

                "currency": "GBP",
                "note_attributes": notes
            }
        };

        if (order[0].discountcode != '' && order[0].discounttype != 'shipping') {
            orderJSON.order.discount_codes = [{
                "amount": Math.abs(parseFloat(order[0].discountvalue)).toString(),
                "code": order[0].discountcode,
                "type": order[0].discounttype
            }];

            orderJSON.order.total_discounts = Math.abs(parseFloat(order[0].discountammount)).toString();
        }

        (0, _shopify.post)('/admin/orders.json', orderJSON).then(function (order) {
            //console.log(order)
            res.redirect(order.order.order_status_url);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| validate cart items
|--------------------------------------------------------------------------
*/
function _checkItems(items) {
    var _this = this;

    return new Promise(function (resolve, reject) {

        var cart = JSON.parse(items),
            ids = cart.map(function (item) {
            return item.productId;
        }),
            variants = cart.map(function (item) {
            return item.variantId;
        }),
            prodList = [],
            final = [];

        if (!ids.length) resolve([]);

        (0, _shopify.get)('/admin/products.json?ids=' + ids.toString()).then(function (data) {

            var prodList = [];

            //grab variants ---
            data.products.forEach(function (product) {
                product.variants.forEach(function (variant) {
                    if (variants.indexOf(variant.id) != -1) prodList.push(variant);
                }, this);
            }, _this);

            //add prices and SKU to cart object --- 
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = prodList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prod = _step2.value;

                    // console.log(prod);
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = cart[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var cartItem = _step3.value;

                            if (prod.id == cartItem.variantId) {
                                cartItem.price = prod.price;
                                cartItem.sku = prod.sku;
                                cartItem.currency = "GBP";
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
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

            resolve(cart);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| process cart
|--------------------------------------------------------------------------
*/
function paypalSend(req, res) {

    _checkItems(req.body.payload).then(function (cart) {

        //abort if no cart items found ---
        if (!cart.length) {
            res.redirect(_config2.default.shop_url + '/cart');
            return;
        }

        //calculate subtotal ---
        var subtotal = 0;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = cart[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;

                subtotal += parseInt(item.quantity) * parseFloat(item.price);
            }

            //apply shipping ---
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        var shippingCost = parseFloat(req.body.shipping_1),
            shippingDesc = req.body.shipping_desc,
            shippingType = req.body.shipping_type,
            shippingAddress = {
            line1: req.body.address1 || null,
            line2: req.body.address2 || null,
            city: req.body.city || null,
            country: req.body.country || null,
            postcode: req.body.zip || null
        },
            storeId = req.body.store_id;

        //apply pass my parcel shipping --- 
        if (shippingType == 'click-collect') {
            shippingCost = subtotal < _config2.default.pmp.breakpoint ? _config2.default.pmp.shipping_cost : 0.00;
        }

        //apply discount --- 
        (0, _discount.paypalDiscount)(cart, subtotal, shippingCost, req.body.discount_code).then(function (discount) {

            if (discount) {
                //apply discount to shipping or items ---
                if (discount.shipping_discount) {
                    shippingCost += discount.total;
                } else {
                    subtotal += discount.total;
                }
            }

            //calculate total ---
            var total = subtotal + shippingCost;

            //send payload ---
            sendPayload(cart, {}, subtotal, total, shippingCost, shippingDesc, shippingType, shippingAddress, discount, storeId, res);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| send payload to paypal
|--------------------------------------------------------------------------
*/
function sendPayload(cart, address, subtotal, total, shippingCost, shippingDesc, shippingType, shippingAddress, discount, storeId, res) {

    var items = [];

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = cart[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var prod = _step5.value;

            items.push({
                "name": prod.title.toString(),
                "quantity": prod.quantity.toString(),
                "price": prod.price.toString(),
                "currency": prod.currency.toString()
            });
        }

        //console.log(discount); return;
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    if (discount) {

        var title = discount.shipping_discount ? 'FREE SHIPPING' : 'DISCOUNT';

        if (discount.shipping_discount) {
            items.push({
                "name": title,
                "quantity": 1,
                "price": '0.00',
                "currency": 'GBP'
            });
        } else {
            items.push({
                "name": title,
                "quantity": 1,
                "price": discount.total.toFixed(2).toString(),
                "currency": 'GBP'
            });
        }
    }

    //setup payment payload ---
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },

        "redirect_urls": {
            "return_url": _config2.default.paypal.return_url,
            "cancel_url": _config2.default.paypal.cancel_url
        },

        "transactions": [{

            "item_list": {

                //items ---
                "items": items
            },

            //total ---
            "amount": {
                "currency": "GBP",
                "total": total.toFixed(2).toString(),
                "details": {
                    "subtotal": subtotal.toFixed(2).toString(),
                    "shipping": shippingCost.toFixed(2).toString()
                }
            },

            "description": "ALL GOOD THINGS"

        }]
    };

    //set shipping address if applicable ---
    if (shippingAddress.line1 && shippingAddress.line2) {
        create_payment_json.transactions[0].item_list.shipping_address = {
            "line1": shippingAddress.line1,
            "line2": shippingAddress.line2,
            "city": shippingAddress.city,
            "country_code": shippingAddress.country,
            "postal_code": shippingAddress.postcode
        };
    }

    //create the payment ---
    _paypalRestSdk2.default.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response.details);
            throw error;
        } else {

            var transaction = _models2.default['paypal'].build({
                completed: 'false',
                paypalId: payment.id,
                transaction: JSON.stringify(payment.transactions),
                subtotal: subtotal,
                total: total,
                shipping: shippingCost,
                discountcode: discount ? discount.code : '',
                discounttype: discount ? discount.type : '',
                discountammount: discount ? discount.total : '',
                discountvalue: discount ? discount.value : '',
                shipping_desc: shippingDesc,
                shipping_type: shippingType,
                cart: JSON.stringify(cart),
                storeId: storeId
            });

            transaction.save();

            var approval_url = void 0;

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = payment.links[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var link = _step6.value;

                    if (link.rel == 'approval_url') approval_url = link.href;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (approval_url) {
                res.redirect(approval_url);
            } else {
                res.send(403);
            }
        }
    });
}