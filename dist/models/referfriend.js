"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {

    var ReferFriend = sequelize.define("referFriend", {

        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        friendsEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });

    return ReferFriend;
};

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;