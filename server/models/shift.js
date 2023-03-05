'use strict';

const Shift = (sequelize, DataTypes) => sequelize.define(
  'shift',
  {
    shift_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    day_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    people_required: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'shifts',
    timestamps: false
  }
);

module.exports = Shift;