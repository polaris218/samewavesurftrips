"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Latlong = sequelize.define("latlong", {

        postcode: {
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

    return Latlong;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;