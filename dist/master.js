'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _forky = require('forky');

var _forky2 = _interopRequireDefault(_forky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var WORKERS = process.env.WEB_CONCURRENCY || 1;
console.log('Cluster is running ' + WORKERS + ' instances per dyno\n---------------------------------------------------');

/* 
|--------------------------------------------------------------------------
| master cluster process
|--------------------------------------------------------------------------
*/
(0, _forky2.default)({ workers: WORKERS, path: __dirname + '/worker.js' });