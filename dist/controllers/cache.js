'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.clearCache = clearCache;
exports.getCache = getCache;
exports.setCache = setCache;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _arraybufferToString = require('arraybuffer-to-string');

var _arraybufferToString2 = _interopRequireDefault(_arraybufferToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cacheModel = _models2.default['cache'];


/* 
|--------------------------------------------------------------------------
| Clear out of date cache
|--------------------------------------------------------------------------
*/
function clearCache() {
	var now = (0, _moment2.default)(),
	    then = (0, _moment2.default)(now).subtract(5, "minutes").toDate();

	cacheModel.destroy({ where: {
			createdAt: {
				lt: then
			}
		} }).then(function (cache) {});
}

/* 
|--------------------------------------------------------------------------
| Get cache from redis or mysql
|--------------------------------------------------------------------------
*/
function getCache(url, callback) {
	_models2.default['cache'].findAll({ where: { url: url } }).then(function (data) {
		if (data.length > 0) {
			callback(JSON.parse(data[0].data));return;
		} else {
			callback(false);return;
		}
	});
}

/* 
|--------------------------------------------------------------------------
| Set cache
|--------------------------------------------------------------------------
*/
function setCache(url, data) {

	var newCache = cacheModel.build({
		url: url,
		data: JSON.stringify(data)
	});

	newCache.save();
}