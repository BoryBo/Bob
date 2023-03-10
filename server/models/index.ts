"use strict";
require("dotenv").config();

type dbType = {
  sequelize: any;
  Sequelize: any;
  Employee: any;
  Shift: any;
  ShiftType: any;
};

const Sequelize = require("sequelize");

const db: dbType = {
  sequelize: "",
  Sequelize: "",
  Employee: "",
  Shift: "",
  ShiftType: "",
};

const sequelize = new Sequelize(process.env.DB_URI);

db.Employee = require("./employee")(sequelize, Sequelize.DataTypes);
db.Shift = require("./shift")(sequelize, Sequelize.DataTypes);
db.ShiftType = require("./shiftType")(sequelize, Sequelize.DataTypes);

db.Shift.belongsToMany(db.Employee, {
  through: "employees_shifts",
  onDelete: "cascade",
});

db.ShiftType.hasMany(db.Shift, {
  foreignKey: {
    name: "shift_type_id", // name used in the API (postman)
    field: "shift_type_id", // name used in the DB
  },
  onDelete: "cascade",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
