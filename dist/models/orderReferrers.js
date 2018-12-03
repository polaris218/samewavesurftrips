"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var OrderReferrer = sequelize.define("orderreferrers", {

        order_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        order: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        referrer: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        customer: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return OrderReferrer;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;