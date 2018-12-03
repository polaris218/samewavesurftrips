'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.purchaseOrdersList = purchaseOrdersList;
exports.purchaseOrderCreate = purchaseOrderCreate;
exports.purchaseOrderGenerate = purchaseOrderGenerate;
exports.downloadPurchaseOrder = downloadPurchaseOrder;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

require('./polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function purchaseOrdersList(req, res) {
    _models2.default['purchaseorders'].findAll({ raw: true }).then(function (orders) {
        res.render('purchaseorders/list', { layout: 'admin', orders: orders, random: Math.round(Math.random() * 100000) });
    });
}

/* 
|--------------------------------------------------------------------------
| Create purchase order
|--------------------------------------------------------------------------
*/
function purchaseOrderCreate(req, res) {

    _models2.default['purchaseorders'].max('po_number', {}).then(function (po) {
        if (!po) po = 0;
        po += 1;

        var po_number = "AGT-".concat(po.toString().padStart(4, '0')),
            today = new Date().toISOString().substring(0, 10);

        res.render('purchaseorders/create', { layout: 'admin', random: Math.round(Math.random() * 100000), po_number: po_number, ponumber_notFormatted: po, today: today });
    });
};

/* 
|--------------------------------------------------------------------------
| Generate purchase order
|--------------------------------------------------------------------------
*/
function purchaseOrderGenerate(req, res) {

    //add purchase order items to a loopable array ---
    var items = [];

    if (req.body.item_name.constructor === Array) {
        for (var i = 0; i < req.body.item_name.length; i++) {
            items.push({
                name: req.body.item_name[i],
                description: req.body.item_description[i],
                quantity: req.body.item_quantity[i],
                price: req.body.item_price[i]
            });
        }
    } else {
        items.push({
            name: req.body.item_name,
            description: req.body.item_description,
            quantity: req.body.item_quantity,
            price: req.body.item_price
        });
    }

    req.body.itemArray = items;

    //save purchase order ---
    var order = _models2.default['purchaseorders'].build({
        vendor_name: req.body.vendor_name,
        vendor_email: req.body.vendor_email,
        vendor_phone: req.body.vendor_phone,
        vendor_address: req.body.vendor_address,
        vendor_city: req.body.vendor_city,
        vendor_postcode: req.body.vendor_postcode,
        vendor_state: req.body.vendor_state,
        vendor_country: req.body.vendor_country,
        po_number: req.body.po_number,
        order_date: req.body.purchaseorder_date,
        delivery_date: req.body.purchaseorder_deliverydate,
        shipping_method: req.body.purchaseorder_shippingmethod,
        shipping_terms: req.body.purchaseorder_shippingterms,
        items: JSON.stringify(req.body.itemArray),
        notes: req.body.purchaseorder_notes,
        subtotal: req.body.subtotal,
        tax: req.body.tax,
        tax_rate: parseFloat(req.body.tax_rate.replace('%', '')),
        total: req.body.total
    });

    order.save();
    res.redirect('/purchaseorders/');
};

/* 
|--------------------------------------------------------------------------
| Download PDF
|--------------------------------------------------------------------------
*/
function downloadPurchaseOrder(req, res) {

    var id = parseInt(req.params.id);

    _models2.default['purchaseorders'].findAll({ where: { id: id }, raw: true }).then(function (order) {

        order[0].itemArray = JSON.parse(order[0].items);

        res.render('purchaseorders/template', { body: order[0] }, function (err, html) {

            //create pdf ---
            var options = { format: 'A4', border: '40px', "quality": "100" },
                po_number = "AGT-".concat(order[0].po_number.toString().padStart(4, '0'));

            _htmlPdf2.default.create(html, options).toFile('./temp/' + po_number + '.pdf', function (err, response) {
                if (err) return console.log(err);
                res.download('./temp/' + po_number + '.pdf');
            });
        });
    });

    //generate PDF
}