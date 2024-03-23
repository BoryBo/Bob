"use strict";
const User = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    },
  );

module.exports = User;