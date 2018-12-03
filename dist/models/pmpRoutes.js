"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var PMPRoutes = sequelize.define("pmpRoutes", {

        store: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        depot: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        depotDesc: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        roundDrops: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return PMPRoutes;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;