"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var PMPStores = sequelize.define("pmpStores", {

        storeId: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        storeName: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        storeTimeZone: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        country: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        standardStoreHours: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        storeAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        Latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        Longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return PMPStores;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;