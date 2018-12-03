'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!global.hasOwnProperty('db')) {

  console.log('setting up mysql connection');

  var fs = require('fs'),
      path = require('path'),
      Sequelize = require('sequelize'),
      sequelize = null,
      basename = null,
      config = require('../config');

  //get models ---
  basename = path.basename(module.filename);
  sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize
  };

  fs.readdirSync(__dirname).filter(function (file) {
    return file.indexOf('.') !== 0 && file !== basename;
  }).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    global.db[model.name] = model;
  });

  Object.keys(global.db).forEach(function (modelName) {
    if ('associate' in global.db[modelName]) {
      global.db[modelName].associate(global.db);
    }
  });
}

exports.default = global.db; //mysql models