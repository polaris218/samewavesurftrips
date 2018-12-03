'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickCollectSearch = clickCollectSearch;
exports.storeOrders = storeOrders;
exports.storePrintLabel = storePrintLabel;
exports.getTodaysManifest = getTodaysManifest;
exports.addToManifest = addToManifest;
exports.removeFromManifest = removeFromManifest;
exports._getLatestStores = _getLatestStores;
exports._getLatestRoutes = _getLatestRoutes;
exports.getOpenOrders = getOpenOrders;
exports._processManifest = _processManifest;

var _passmyparcel = require('./passmyparcel');

var _passmyparcel2 = _interopRequireDefault(_passmyparcel);

var _shopify = require('./shopify');

var _bwipJs = require('bwip-js');

var _bwipJs2 = _interopRequireDefault(_bwipJs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _email = require('./email');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PMP = new _passmyparcel2.default();

/* 
|--------------------------------------------------------------------------
| Find stores
|--------------------------------------------------------------------------
*/
function clickCollectSearch(req, res) {
    PMP.findStore(req.query.postcode).then(function (stores) {
        res.json(stores);
    });
}

/* 
|--------------------------------------------------------------------------
| Retrieve store pickup orders
|--------------------------------------------------------------------------
*/
function storeOrders(req, res) {
    var _this = this;

    (0, _shopify.get)('/admin/orders.json?limit=250').then(function (data) {

        var pmpOrders = [];

        data.orders.forEach(function (order) {
            if (order.note_attributes.length > 0) {
                order.note_attributes.forEach(function (att) {
                    if (att.name == 'shipping_type' && att.value == 'click-collect') {
                        pmpOrders.push(order);
                    }
                }, this);
            }
        }, _this);

        _models2.default['todaysManifest'].findAll({ raw: true }).then(function (todays_manifest) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = todays_manifest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var today = _step.value;

                    for (var order in pmpOrders) {
                        if (today.orderId == pmpOrders[order].id) {
                            pmpOrders.splice(order, 1);
                        }
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

            res.render('storeOrders/orders', { layout: 'admin', random: Math.round(Math.random() * 100000), orders: pmpOrders });
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Print a Pass my Parcel label
|--------------------------------------------------------------------------
*/
function storePrintLabel(req, res) {
    var _this2 = this;

    var store_id = -1,
        store = void 0,
        route = void 0;

    (0, _shopify.get)('/admin/orders/' + req.params.id + '.json').then(function (data) {
        if (data.length == 0) return;

        if (data.order.note_attributes.length > 0) {
            data.order.note_attributes.forEach(function (att) {
                if (att.name == 'store_id') {
                    store_id = att.value;
                }
            }, _this2);
        }

        //get store data ---
        _models2.default['pmpStores'].findAll({ where: { storeId: store_id }, raw: true }).then(function (storeData) {
            store = storeData;

            _models2.default['pmpRoutes'].findAll({ where: { store: store_id }, raw: true }).then(function (route) {
                _generateBarcode(res, data.order, store, route);
            });
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Generate 2D barcode
|--------------------------------------------------------------------------
*/
function _generateBarcode(res, order, store, route) {

    _generateTrackingCode(order, function (trackingcode) {

        //barcode
        _bwipJs2.default.toBuffer({
            bcid: 'datamatrix', // Barcode type 
            text: trackingcode.replace(/ /g, ""), // Text to encode 
            scale: 3, // 3x scaling factor 
            width: 144,
            height: 144, // Bar height, in millimeters 
            includetext: true, // Show human-readable text 
            textxalign: 'center', // Always good to set this 
            textfont: 'Inconsolata', // Use your custom font 
            textsize: 13 // Font size, in points 
        }, function (err, png) {
            if (err) {
                console.log(err);
            } else {

                var wave1Round = JSON.parse(route[0].roundDrops).Round[0] || '',
                    wave1Drop = JSON.parse(route[0].roundDrops).Drop[0] || '',
                    wave2Round = JSON.parse(route[0].roundDrops).Round[1] || '',
                    wave2Drop = JSON.parse(route[0].roundDrops).Drop[1] || '';

                res.render('storeOrders/label', { layout: 'admin', trackingcode: trackingcode.replace(/ /g, ""), store: store[0], storeAddress: JSON.parse(store[0].storeAddress), route: route[0], order: order, wave1Round: wave1Round, wave1Drop: wave1Drop, wave2Round: wave2Round, wave2Drop: wave2Drop, random: Math.round(Math.random() * 100000), barcode: png.toString('base64') });
            }
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Generate tracking code
|--------------------------------------------------------------------------
*/
function _generateTrackingCode(orders, callback) {

    var order = orders.order ? orders.order : orders;
    var store_id = void 0,
        store = void 0;

    if (order.note_attributes.length > 0) {
        order.note_attributes.forEach(function (att) {
            if (att.name == 'store_id') {
                store_id = att.value;
            }
        }, this);
    }

    //get store data ---
    _models2.default['pmpStores'].findAll({ where: { storeId: store_id }, raw: true }).then(function (storeData) {
        store = storeData;

        _models2.default['pmpRoutes'].findAll({ where: { store: store_id }, raw: true }).then(function (route) {
            var trackingcode = '' + _config2.default.pmp.identifier + _config2.default.pmp.service_code + ' ' + order.order_number.toString().padStart(8, '0') + ' ' + route[0].depot.toString().substring(1) + route[0].store;
            callback(trackingcode);
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Get todays manifest
|--------------------------------------------------------------------------
*/
function getTodaysManifest(req, res) {
    _models2.default['todaysManifest'].findAll({ where: { processed: 'false' }, raw: true }).then(function (todays_manifest) {
        res.json(todays_manifest);
    });
}

/* 
|--------------------------------------------------------------------------
| Add order to todays manifest run
|--------------------------------------------------------------------------
*/
function addToManifest(req, res) {

    var id = parseInt(req.body.id),
        ref = req.body.ref.toString(),
        storeId = req.body.storeId;

    var tommorrow = new Date();
    tommorrow.setDate(tommorrow.getDate() + 1);

    _models2.default['pmpRoutes'].findAll({ where: { store: storeId } }).then(function (route) {

        (0, _shopify.get)('/admin/orders/' + id + '.json').then(function (order) {

            _generateTrackingCode(order, function (trackingcode) {
                _models2.default['todaysManifest'].build({
                    orderId: id,
                    orderRef: ref,
                    processed: 'false',
                    tracking_number: trackingcode,
                    store_id: storeId,
                    depot_id: route[0].dataValues.depot,
                    delivery_date: tommorrow.toString()
                }).save().then(function (data) {
                    _models2.default['todaysManifest'].findAll({ raw: true }).then(function (todays_manifest) {
                        res.json(todays_manifest);
                    });
                });
            });
        });
    });
}

/* 
|--------------------------------------------------------------------------
| Remove order from todays manifest run
|--------------------------------------------------------------------------
*/
function removeFromManifest(req, res) {

    var id = parseInt(req.body.id);

    _models2.default['todaysManifest'].destroy({
        where: { orderId: id }
    }).then(function (data) {
        _models2.default['todaysManifest'].findAll({ raw: true }).then(function (todays_manifest) {
            res.json(todays_manifest);
        });
    });
}

/*  
|--------------------------------------------------------------------------
| get the lastest store list from Passmyparcel
|--------------------------------------------------------------------------
*/
function _getLatestStores() {
    console.log('Passmyparcel Stores Updated.');
    _request2.default.post(_config2.default.pmp.manifest_url, { form: { hash: _config2.default.pmp.sftp_hash, getstores: true } });
}

/*  
|--------------------------------------------------------------------------
| get the lastest routes list from Passmyparcel
|--------------------------------------------------------------------------
*/
function _getLatestRoutes() {
    console.log('Passmyparcel Routes Updated.');
    _request2.default.post(_config2.default.pmp.manifest_url, { form: { hash: _config2.default.pmp.sftp_hash, getroutes: true } });
}

/*  
|--------------------------------------------------------------------------
| get all open orders
|--------------------------------------------------------------------------
*/
function getOpenOrders(req, res) {
    var _this3 = this;

    (0, _shopify.get)('/admin/orders.json?limit=250', 'false').then(function (data) {

        var pmpOrders = [];

        data.orders.forEach(function (order) {
            if (order.note_attributes.length > 0) {
                order.note_attributes.forEach(function (att) {
                    if (att.name == 'shipping_type' && att.value == 'click-collect') {
                        pmpOrders.push(order);
                    }
                }, this);
            }
        }, _this3);

        _models2.default['todaysManifest'].findAll({ raw: true }).then(function (todays_manifest) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = todays_manifest[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var today = _step2.value;

                    for (var order in pmpOrders) {
                        if (today.orderId == pmpOrders[order].id) {
                            pmpOrders.splice(order, 1);
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

            res.json(pmpOrders);
        });
    });
}

/*  
|--------------------------------------------------------------------------
| get all open orders
|--------------------------------------------------------------------------
*/
function _processManifest() {

    console.log('Processing Manifest');

    _models2.default['todaysManifest'].findAll({ where: {
            processed: 'false'
        } }).then(function (manifest_list) {

        var ids = [];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = manifest_list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _order = _step3.value;

                ids.push(_order.orderId);
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

        if (!ids.length) return;

        (0, _shopify.get)('/admin/orders.json?status=any&ids=' + ids.toString()).then(function (orders) {

            var item_string = '';
            var total_weight = 0;
            var manifest_id = new Date().YYYYMMDDHHMMSS();

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                var _loop = function _loop() {
                    var order = _step4.value;


                    total_weight += order.total_weight || 0;

                    var manifest = manifest_list.filter(function (obj) {
                        return obj.orderId == order.id;
                    });
                    var delivery_duedate = (0, _moment2.default)(new Date(manifest[0].dataValues.delivery_date)).format('YYYYMMDD');

                    item_string += '<Item>\n                                    <ServiceType>NEXT_DAY</ServiceType>\n                                    <ConsigneeName>' + order.customer.first_name + ' ' + order.customer.last_name + '</ConsigneeName>\n                                    <ConsigneeEmail>' + order.contact_email + '</ConsigneeEmail>\n                                    <ShipmentEmailNotification>Y</ShipmentEmailNotification>\n                                    <ShipmentSMSNotification>N</ShipmentSMSNotification>\n                                    <GrossWeight>' + (order.total_weight || 1.00) + '</GrossWeight>\n                                    <ParcelHeight>10</ParcelHeight>\n                                    <ParcelLength>10</ParcelLength>\n                                    <ParcelDepth>10</ParcelDepth>\n                                    <YourRef>' + order.order_number + '</YourRef>\n                                    <DeliveryDueDate>' + delivery_duedate + '</DeliveryDueDate>\n                                    <TrackingID>' + manifest[0].dataValues.tracking_number.replace(/ /g, "") + '</TrackingID>\n                                    <SNStoreID>' + manifest[0].dataValues.store_id + '</SNStoreID>\n                                    <SNDepotID>' + manifest[0].dataValues.depot_id + '</SNDepotID>\n                                </Item>';
                };

                for (var _iterator4 = orders.orders[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    _loop();
                }

                //create xml and upload --- 
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

            var manifest_xml = _makeXML(item_string, total_weight, manifest_id);

            _request2.default.post(_config2.default.pmp.manifest_url, { form: { hash: _config2.default.pmp.sftp_hash, savemanifest: true, manifest: manifest_xml, id: manifest_id } }, function () {
                (0, _email.emailSendManifestProcessing)('luke@freemandigital.com', manifest_xml);
            });

            //update manifest to processed ---
            _models2.default['todaysManifest'].update({
                processed: 'true'
            }, {
                where: {
                    processed: 'false'
                }
            });
        });
    });
}

function _makeXML(items, total_weight, manifest_id) {

    var DespatchDate = new Date();
    var DespatchDate_formatted = (0, _moment2.default)(DespatchDate).format('YYYYMMDD');

    var xml = '<?xml version="1.0" encoding="utf-8" ?>\n                <Manifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n                    <Header>\n                        <ManifestId>' + manifest_id + '</ManifestId>\n                        <ManifestDate>' + new Date().toISOString() + '</ManifestDate>\n                        <DespatchDate>' + DespatchDate_formatted + '</DespatchDate>\n                        <CountOfParcels>1</CountOfParcels>\n                        <TotalGrossWeight>' + total_weight + '</TotalGrossWeight>\n                        <SenderCompany>ALL GOOD THINGS</SenderCompany>\n                        <SenderILN>GT</SenderILN>\n                    </Header>\n                    ' + items + '\n                    </Manifest>';

    return xml;
}

//padStart polyfill ---
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function value() {
        function pad2(n) {
            // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        var rand = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();

        return this.getFullYear() + pad2(this.getMonth() + 1) + pad2(this.getDate()) + pad2(this.getHours()) + pad2(this.getMinutes()) + pad2(this.getSeconds()) + rand;
        //pad2(this.getMilliseconds());
    }
});