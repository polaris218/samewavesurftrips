'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = require('mongodb').ObjectID;

var Model = function () {
    /* 
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */
    function Model(args) {
        _classCallCheck(this, Model);

        this.created_at = {
            secret: false,
            validation: _joi2.default.string().required()

            /* 
            |--------------------------------------------------------------------------
            | Validate data object
            |--------------------------------------------------------------------------
            */
        };

        this.req = args;
    }

    /* 
    |--------------------------------------------------------------------------
    | Model properties
    |--------------------------------------------------------------------------
    */


    _createClass(Model, [{
        key: 'validate',
        value: function validate(data) {
            var _this = this;

            var validationKeys = {};

            Object.keys(this).forEach(function (key) {
                if (_this[key].validation) validationKeys[key] = _this[key].validation;
            });

            var schema = _joi2.default.object().keys(validationKeys);

            var result = _joi2.default.validate(data, schema);

            return result;
        }

        /* 
        |--------------------------------------------------------------------------
        | Save model
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'save',
        value: function save() {
            var _this2 = this;

            var dataModel = {
                created_at: Date.now().toString()
            };

            Object.keys(this).forEach(function (key) {

                Object.keys(_this2.req.body).forEach(function (key2) {
                    if (key == key2) {
                        dataModel[key] = _this2.req.body[key2];
                    }
                });
            });

            var validData = this.validate(dataModel);

            if (validData.error) {
                return new Promise(function (resolve, reject) {
                    reject(validData);
                });
            } else {
                return this.publish(dataModel);
            }
        }

        /* 
        |--------------------------------------------------------------------------
        | Get all model data
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'getAll',
        value: function getAll() {
            var _this3 = this;

            var collection = this.req.db.collection(this.collection);
            var skip = parseInt(this.req.query.skip) || 0;
            var sort = this.req.query.sort || '';

            return new Promise(function (resolve, reject) {

                collection.count().then(function (total) {
                    var pages = Math.ceil(total / _config2.default.db.paging);

                    collection.find().skip(skip).limit(_config2.default.db.paging).sort({ sort: -1 }).toArray(function (err, resp) {

                        var data = _this3.maskPrivate(resp);

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
        value: function get() {
            var _this4 = this;

            var collection = this.req.db.collection(this.collection);

            return new Promise(function (resolve, reject) {

                collection.find(ObjectId(_this4.req.params.id)).toArray(function (err, resp) {

                    var data = _this4.maskPrivate(resp);

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
            var _this5 = this;

            if (Array.isArray(data)) {
                return data.map(function (item) {
                    Object.keys(item).forEach(function (key) {
                        if (_this5[key]) {
                            if (_this5[key]['secret']) delete item[key];
                        }
                    });

                    return item;
                });
            }

            if (!Array.isArray(data)) {
                Object.keys(data).forEach(function (key) {
                    if (_this5[key]) {
                        if (_this5[key]['secret']) delete data[key];
                    }
                });

                return data;
            }
        }
    }]);

    return Model;
}();

exports.default = Model;