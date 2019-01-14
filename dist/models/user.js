'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* 
|--------------------------------------------------------------------------
| API Docs
|--------------------------------------------------------------------------
*/
/**
 * @apiDefine UserObject
 * @apiSuccess {String}   _id   Unique id.
 * @apiSuccess {String}   first_name   First Name.
 * @apiSuccess {String}   last_name   Last Name.
 */

/* 
|--------------------------------------------------------------------------
| User model
|--------------------------------------------------------------------------
*/
var User = function (_Model) {
    _inherits(User, _Model);

    /* 
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */
    function User(args) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, args));

        _this.first_name = {
            secret: false,
            validation: _joi2.default.string().alphanum().min(13).max(30).required()
        };
        _this.last_name = {
            secret: false,
            validation: _joi2.default.string().alphanum().min(13).max(30).required()
        };
        _this.email = {
            secret: false,
            validation: _joi2.default.string().email({ minDomainAtoms: 2 })
        };
        _this.password = {
            secret: true,
            validation: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/)

            /* 
            |--------------------------------------------------------------------------
            | Publish
            |--------------------------------------------------------------------------
            */
        };

        _this.collection = 'users';
        return _this;
    }

    /* 
    |--------------------------------------------------------------------------
    | Model properties
    |--------------------------------------------------------------------------
    */


    _createClass(User, [{
        key: 'publish',
        value: function publish(data) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var collection = _this2.req.db.collection(_this2.collection);

                _bcrypt2.default.hash(data.password, 10, function (err, hash) {
                    data.password = hash;

                    collection.insert(data, function (err, records) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(records);
                        }
                    });
                });
            });
        }

        /* 
        |--------------------------------------------------------------------------
        | Check user exists
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'doesNotExists',
        value: function doesNotExists() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var collection = _this3.req.db.collection(_this3.collection);
                var email = _this3.req.body.email;

                collection.find({ email: email }).toArray(function (err, resp) {

                    if (resp.length > 0) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        }
    }]);

    return User;
}(_model2.default);

exports.User = User;