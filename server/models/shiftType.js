'use strict';

const ShiftType = (sequelize, DataTypes) => sequelize.define(
  'shift_type',
  {
    shift_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    short_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    long_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    starts_at: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    ends_at: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      //Virtuals: https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.ends_at - this.starts_at}`;
      },
      set (value) {
        throw new Error('Do not try to set the `duration` value!');
      }
    }
  },
  {
    tableName: 'shift_types',
    timestamps: false
  }
);

module.exports = ShiftType;