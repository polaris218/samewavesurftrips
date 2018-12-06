"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

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
 * @apiSuccess {String}   email   Email address.
 */

/* 
|--------------------------------------------------------------------------
| User model
|--------------------------------------------------------------------------
*/
var User = function (_Model) {
    _inherits(User, _Model);

    function User(args) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, args));

        _this.first_name = "";
        _this.last_name = "";
        _this.email = "";
        return _this;
    }

    return User;
}(_model2.default);

exports.User = User;