"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var User = sequelize.define("users", {

        profile: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        property: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        type: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        email: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        token: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        secret: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        customerId: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return User;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;