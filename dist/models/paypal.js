'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Paypal = sequelize.define("paypal", {

        completed: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        paypalId: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        payerId: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        transaction: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },

        subtotal: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        shipping: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        discountcode: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        discounttype: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        discountammount: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        discountvalue: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        shipping_type: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        shipping_desc: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        total: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        cart: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },

        customer: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },

        email: {
            type: DataTypes.BLOB('medium'),
            allowNull: true
        },

        storeId: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Paypal;
};

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;