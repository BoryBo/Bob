'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false,
  }
);

db.Employee = require('./employee')(sequelize, Sequelize.DataTypes);
db.Shift = require('./shift')(sequelize, Sequelize.DataTypes);
db.ShiftType = require('./shiftType')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);

db.Shift.belongsToMany(db.Employee, { through: 'employees_shifts', onDelete: 'cascade' });
db.ShiftType.hasMany(db.Shift, {
  foreignKey: {
    name: 'shift_type_id', // name used in the API (postman)
    field: 'shift_type_id' // name used in the DB
  },
  onDelete: 'cascade'
});

db.User.hasMany(db.Employee, {
  foreignKey: {
    name: "user_id",
    field: "user_id"
  },
  onDelete: "cascade",
});

db.User.hasMany(db.ShiftType, {
  foreignKey: {
    name: "user_id",
    field: "user_id"
  },
  onDelete: "cascade",
});

db.User.hasMany(db.Shift, {
  foreignKey: {
    name: "user_id",
    field: "user_id"
  },
  onDelete: "cascade",
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

//console.log(db.Sequelize.DataTypes);
module.exports = db;
