'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupDatabase = setupDatabase;
exports.addProductView = addProductView;
exports.createUser = createUser;
exports.createUpdateProduct = createUpdateProduct;
exports.deleteProduct = deleteProduct;
exports.pixel = pixel;
exports.addDetailView = addDetailView;
exports.addBag = addBag;
exports.removeBag = removeBag;
exports.addLike = addLike;
exports.removeLike = removeLike;
exports.addPurchase = addPurchase;
exports.recommendItem = recommendItem;
exports.recommendUser = recommendUser;
exports.phantomRender = phantomRender;
exports.awinCompletedOrder = awinCompletedOrder;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _recombeeApiClient = require('recombee-api-client');

var _recombeeApiClient2 = _interopRequireDefault(_recombeeApiClient);

var _shopify = require('./shopify');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rqs = _recombeeApiClient2.default.requests;
var client = new _recombeeApiClient2.default.ApiClient(_config2.default.tracking.database, _config2.default.tracking.secret);

var databaseFields = [{ name: 'price', type: 'double' }, { name: 'tags', type: 'string' }, { name: 'description', type: 'string' }, { name: 'time', type: 'timestamp' }, { name: 'type', type: 'string' }, { name: 'vendor', type: 'string' }, { name: 'title', type: 'string' }];

/* 
|--------------------------------------------------------------------------
| setup database
|--------------------------------------------------------------------------
*/
function setupDatabase() {
    databaseFields.forEach(function (property) {
        client.send(new rqs.AddItemProperty(property.name, property.type));
    });
}

/* 
|--------------------------------------------------------------------------
| log a product view
|--------------------------------------------------------------------------
*/
function addProductView(req, res) {

    var uuid = req.body.uuid.toString();

    _models2.default['productviews'].findOrCreate({
        defaults: { productId: req.params.item, uuid: uuid },
        where: { productId: req.params.item, uuid: uuid }
    });

    res.send(200);
}

/* 
|--------------------------------------------------------------------------
| create user
|--------------------------------------------------------------------------
*/
function createUser(req, res) {
    client.send(new rqs.AddUser(req.body.userId));
};

/* 
|--------------------------------------------------------------------------
| create product item
|--------------------------------------------------------------------------
*/
function createUpdateProduct(product) {

    client.send(new rqs.SetItemValues(product.id, {
        price: product.variants[0].price,
        tags: product.tags,
        description: product.body_html,
        time: product.updated_at,
        type: product.product_type,
        vendor: product.vendor,
        title: product.title
    }, {
        'cascadeCreate': true
    }));
};

/* 
|--------------------------------------------------------------------------
| delete product item
|--------------------------------------------------------------------------
*/
function deleteProduct(product) {
    client.send(new rqs.DeleteItem(product.id));
    console.log('product deleted');
    res.send(200);
}

/* 
|--------------------------------------------------------------------------
| tracking pixel
|--------------------------------------------------------------------------
*/
function pixel(req, res) {
    var hex1pixeljpeg = 'ffd8ffe000104a46494600010101006000600000ffe1001645786966000049492a0008000000000000000000ffdb00430001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101ffdb00430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101ffc00011080001000103012200021101031101ffc400150001010000000000000000000000000000000affc40014100100000000000000000000000000000000ffc40014010100000000000000000000000000000000ffc40014110100000000000000000000000000000000ffda000c03010002110311003f00bf8001ffd9',
        buffer1PixelJpeg = new Buffer(hex1pixeljpeg, 'hex');

    res.set({ 'Content-Type': 'image/jpeg', 'Content-Length': buffer1PixelJpeg.length }).end(buffer1PixelJpeg, 'binary');
};

/* 
|--------------------------------------------------------------------------
| addDetailView
|--------------------------------------------------------------------------
*/
function addDetailView(req, res) {
    client.send(new rqs.AddDetailView(req.body.userId, req.params.item));
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| addBag
|--------------------------------------------------------------------------
*/
function addBag(req, res) {
    client.send(new rqs.AddCartAddition(req.body.userId, req.params.item));
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| removeBag
|--------------------------------------------------------------------------
*/
function removeBag(req, res) {
    client.send(new rqs.DeleteCartAddition(req.body.userId, req.params.item));
    res.send(200);
};
/* 
|--------------------------------------------------------------------------
| addLike
|--------------------------------------------------------------------------
*/
function addLike(req, res) {
    client.send(new rqs.AddBookmark(req.body.userId, req.params.item));
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| removeLike
|--------------------------------------------------------------------------
*/
function removeLike(req, res) {
    client.send(new rqs.DeleteBookmark(req.body.userId, req.params.item));
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| addPurchase
|--------------------------------------------------------------------------
*/
function addPurchase(req, res) {
    var items = req.body.items || [];

    items.forEach(function (item) {
        client.send(new rqs.AddPurchase(req.body.userId, item, { 'cascadeCreate': true }));
        console.log('purchases saved ' + item);
    });

    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| recommendItem
|--------------------------------------------------------------------------
*/
function recommendItem(req, res) {
    console.log('recommend called');
    console.log(req.body.userId);
    client.send(new rqs.ItemBasedRecommendation(req.params.item, req.body.count, {
        targetUserId: req.body.userId
    })).then(function (items) {

        var ids = items.toString();
        (0, _shopify.get)('/admin/products.json?ids=' + ids).then(function (data) {
            console.log(data.products.length);
            res.json(data.products);
        });
    });
};

/* 
|--------------------------------------------------------------------------
| recommendUser
|--------------------------------------------------------------------------
*/
function recommendUser(req, res) {
    client.send(new rqs.UserBasedRecommendation('user-25', 5)).then(function (recommended) {
        console.log('Recommended items for user-25: ' + recommended);
    });
    res.send(200);
};

/* 
|--------------------------------------------------------------------------
| Phantom browser renderer
|--------------------------------------------------------------------------
*/
function phantomRender(req, res) {
    res.render('awin', { layout: 'awin', channel: req.body.channel, amount: req.body.amount, currency: req.body.currency, orderRef: req.body.orderRef, testmode: req.body.testmode, voucher: req.body.voucher });
}

/* 
|--------------------------------------------------------------------------
| Awin order tracking
|--------------------------------------------------------------------------
*/
function awinCompletedOrder(req, res) {

    var channel = typeof req.body.landing_site === 'string' ? req.body.landing_site.split('&notes=ref-')[1] : 'na',
        amount = req.body.total_price,
        currency = req.body.currency,
        orderRef = req.body.name,
        testmode = "0",
        voucher = "";

    _models2.default['orderreferrers'].findOrCreate({
        defaults: {
            order_id: req.body.name,
            order: JSON.stringify(req.body),
            referrer: channel,
            customer: req.body.email
        },
        where: { order_id: req.body.name }
    });

    var _ph, _page, _outObj;

    _phantom2.default.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        return _page.open('https://app.allgoodthings.uk.com/phantom', 'POST', 'channel=' + channel + '&amount=' + amount + '&currency=' + currency + '&orderRef=' + orderRef + '&testmode=' + testmode + '&voucher=' + voucher);
    }).then(function (status) {
        console.log(status);
        return _page.property('content');
    }).then(function (content) {
        console.log(content);
        _page.close();
        _ph.exit();
    }).catch(function (e) {
        return console.log(e);
    });

    res.send(200);
}