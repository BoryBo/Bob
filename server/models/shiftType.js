'use strict';

const ShiftType = (sequelize, DataTypes) => sequelize.define(
  'shift_type',
  {
    shift_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    abbreviation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      //Virtuals: https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/
      type: DataTypes.VIRTUAL,
      get () {
        return `${parseInt(this.end) - parseInt(this.start)}`;
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