'use strict';

const Shift = (sequelize, DataTypes) => sequelize.define(
  'shift',
  {
    shift_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    peopleRequired: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'shifts',
    timestamps: false
  }
);

module.exports = Shift;