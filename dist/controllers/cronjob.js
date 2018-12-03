'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _search = require('./search');

var _cache = require('./cache');

var _clickCollect = require('./clickCollect');

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cronjob = function () {
    function Cronjob() {
        _classCallCheck(this, Cronjob);

        if (this.workerId() == 1) this.createJobs();
    }

    _createClass(Cronjob, [{
        key: 'createJobs',
        value: function createJobs() {

            /*  
            |--------------------------------------------------------------------------
            | run every 10mins... 
            |--------------------------------------------------------------------------
            */
            _nodeSchedule2.default.scheduleJob('*/10 * * * *', function () {
                (0, _search.sync)();
                (0, _cache.clearCache)();
            });

            /*  
            |--------------------------------------------------------------------------
            | run at 7am every day - UTC time so 1hr behind
            |--------------------------------------------------------------------------
            */
            _nodeSchedule2.default.scheduleJob({ hour: 6, minute: 0 }, function () {
                (0, _clickCollect._getLatestStores)();
                (0, _clickCollect._getLatestRoutes)();
            });

            /*  
            |--------------------------------------------------------------------------
            | run at 16:00 every day - UTC time so 1hr behind
            |--------------------------------------------------------------------------
            */
            _nodeSchedule2.default.scheduleJob({ hour: 15, minute: 0 }, function () {
                (0, _clickCollect._processManifest)();
            });
        }

        /*  
        |--------------------------------------------------------------------------
        | Get the cluster ID 
        |--------------------------------------------------------------------------
        */

    }, {
        key: 'workerId',
        value: function workerId() {
            if (_cluster2.default.isWorker) {
                return _cluster2.default.worker.id;
            }
            return null;
        }
    }]);

    return Cronjob;
}();

exports.default = Cronjob;