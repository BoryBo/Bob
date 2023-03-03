'use strict';

const Sequelize = require('sequelize');
const config = require('./db.config.json');

const db = {};

const sequelize = new Sequelize(
  config.testDatabase,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
  }
);

db.Employee = require('./employee')(sequelize, Sequelize.DataTypes);
db.Shift = require('./shift')(sequelize, Sequelize.DataTypes);
db.ShiftType = require('./shiftType')(sequelize, Sequelize.DataTypes);

db.Shift.belongsToMany(db.Employee, { through: 'employees_shifts', onDelete: 'cascade'});//!see isssues
db.ShiftType.hasMany(db.Shift);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
