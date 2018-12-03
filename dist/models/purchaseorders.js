"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Purchaseorder = sequelize.define("purchaseorders", {

        vendor_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_email: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_phone: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_address: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_city: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_postcode: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_state: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        vendor_country: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        po_number: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        order_date: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        delivery_date: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        shipping_method: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        shipping_terms: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        items: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        tax: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        tax_rate: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        total: {
            type: DataTypes.FLOAT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return Purchaseorder;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;