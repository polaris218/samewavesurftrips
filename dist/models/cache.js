'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Cache = sequelize.define("cache", {

        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        },

        url: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return Cache;
};

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;