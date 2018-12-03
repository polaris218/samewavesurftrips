"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var TodaysManifest = sequelize.define("todaysManifest", {

        orderId: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        orderRef: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        processed: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        tracking_number: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        store_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        depot_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        delivery_date: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return TodaysManifest;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;