"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Vendor = sequelize.define("vendors", {

        name: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        telephone: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        city: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        postcode: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        state: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        country: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return Vendor;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;