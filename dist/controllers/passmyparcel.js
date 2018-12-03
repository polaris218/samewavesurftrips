'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Passmyparcel = function () {
    function Passmyparcel() {
        _classCallCheck(this, Passmyparcel);
    }

    /*  
    |--------------------------------------------------------------------------
    | find store
    |--------------------------------------------------------------------------
    */


    _createClass(Passmyparcel, [{
        key: 'findStore',
        value: function findStore(postcode) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _models2.default['latlong'].findAll({ where: { postcode: postcode } }).then(function (store) {
                    if (!store.length) {
                        resolve(_this.createStore(postcode));
                        return;
                    }

                    var lat = store[0].dataValues.Latitude,
                        long = store[0].dataValues.Longitude;

                    _models2.default.sequelize.query('SELECT *, ( 3959 * acos( cos( radians(' + lat + ') ) * cos( radians(Latitude) ) * cos( radians(Longitude ) - radians(' + long + ') ) + sin( radians(' + lat + ') ) * sin( radians(Latitude) ) ) ) AS distance FROM pmpstores HAVING distance < 30 ORDER BY distance LIMIT 0, 5', { type: _models2.default.sequelize.QueryTypes.SELECT }).then(function (stores) {
                        resolve(stores);
                    });
                });
            });
        }

        /*  
        |--------------------------------------------------------------------------
        | createStore
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'createStore',
        value: function createStore(postcode) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var re = /^([A-Z]{1,2}[\dA-Z]{1,2})[ ]?(\d[A-Z]{2})$/i,
                    parts = postcode.match(re),
                    postcode_query = null;

                console.log(parts, 'parts ----------------------------------------------');

                if (parts[1]) {
                    postcode_query = '' + parts[1];
                }

                if (parts[2]) {
                    postcode_query += ' ' + parts[2];
                }

                console.log(postcode_query);

                (0, _request2.default)('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAoI9yFSXMMcWXCInBi9Xz5kPNtIK2kAGI&address=' + postcode_query, function (error, response, body) {

                    console.log(body);

                    var geometry = void 0,
                        long = void 0,
                        lat = void 0,
                        resp = void 0,
                        geolocation = void 0;

                    resp = JSON.parse(body);

                    if (resp.status != 'OK') {
                        resolve([]);
                        return;
                    }

                    //get lat long ---
                    geometry = resp.results[0]['geometry'];
                    long = parseFloat(geometry.location.lng);
                    lat = parseFloat(geometry.location.lat);

                    geolocation = _models2.default['latlong'].build({
                        postcode: postcode,
                        Latitude: lat,
                        Longitude: long
                    });

                    geolocation.save().then(function () {
                        resolve(_this2.findStore(postcode));
                    });
                });
            });
        }
    }]);

    return Passmyparcel;
}();

exports.default = Passmyparcel;