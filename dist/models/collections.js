"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var Collection = sequelize.define("collections", {

        data: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return Collection;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;