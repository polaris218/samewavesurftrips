'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = require('mongodb').ObjectID;

var Model = function () {
    function Model(args) {
        _classCallCheck(this, Model);
    }

    /* 
    |--------------------------------------------------------------------------
    | Save model
    |--------------------------------------------------------------------------
    */


    _createClass(Model, [{
        key: 'save',
        value: function save(req) {
            var dataModel = {};

            Object.keys(this).forEach(function (key) {

                Object.keys(req.body).forEach(function (key2) {
                    if (key == key2) {
                        dataModel[key] = req.body[key2];
                    }
                });
            });

            return this.publish(req, dataModel);
        }

        /* 
        |--------------------------------------------------------------------------
        | Get all model data
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'getAll',
        value: function getAll(req) {
            var _this = this;

            var collection = req.db.collection(this.collection);
            var skip = parseInt(req.query.skip) || 0;
            var sort = req.query.sort || '';

            return new Promise(function (resolve, reject) {

                collection.count().then(function (total) {
                    var pages = Math.ceil(total / _config2.default.db.paging);

                    collection.find().skip(skip).limit(_config2.default.db.paging).sort({ sort: -1 }).toArray(function (err, resp) {

                        var data = _this.maskPrivate(resp);

                        if (err) {
                            reject(err);
                        } else {
                            resolve({ pages: pages, data: data });
                        }
                    });
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | Get single model by id
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'get',
        value: function get(req) {
            var _this2 = this;

            var collection = req.db.collection(this.collection);

            return new Promise(function (resolve, reject) {

                collection.find(ObjectId(req.params.id)).toArray(function (err, resp) {

                    var data = _this2.maskPrivate(resp);

                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | Mask private fields
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'maskPrivate',
        value: function maskPrivate(data) {
            var _this3 = this;

            if (Array.isArray(data)) {
                return data.map(function (item) {
                    Object.keys(item).forEach(function (key) {
                        if (_this3[key]) {
                            if (_this3[key]['secret']) delete item[key];
                        }
                    });

                    return item;
                });
            }

            if (!Array.isArray(data)) {
                Object.keys(data).forEach(function (key) {
                    if (_this3[key]) {
                        if (_this3[key]['secret']) delete data[key];
                    }
                });

                return data;
            }
        }
    }]);

    return Model;
}();

exports.default = Model;