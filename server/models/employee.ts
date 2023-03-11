"use strict";

const Employee = (sequelize: any, DataTypes: any) =>
  sequelize.define(
    "employee",
    {
      employee_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
    },
    {
      tableName: "employees",
      timestamps: false,
    }
  );

module.exports = Employee;
