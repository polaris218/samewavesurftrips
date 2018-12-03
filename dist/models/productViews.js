"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var ProductView = sequelize.define("productviews", {

        productId: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        uuid: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return ProductView;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;