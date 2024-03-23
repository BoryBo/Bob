'use strict';
const { where } = require('sequelize');
const db = require('../models');
const { use } = require('../router');

exports.getAllShiftTypes = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('get All ShiftTypes ******************', userId);
    let shiftTypes = await db.ShiftType.findAll({
      where: { user_id: userId }
    });
    res
      .status(200)
      .send(shiftTypes);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};

exports.addShiftType = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Add Shifttype ******************', userId);
    let newShiftType = await db.ShiftType.create({
      description: req.body.description,
      abbreviation: req.body.abbreviation,
      start: req.body.start,
      end: req.body.end,
      user_id: userId
    });
    res
      .status(201)
      .send(newShiftType);
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message });
  }
};

exports.deleteShiftType = async (req, res) => {
  let id = req.params.id;
  const { userId } = req.params;
  console.log('Delete ShiftType ******************', userId);
  try {
    await db.ShiftType.destroy({
      where: {
        shift_type_id: id,
        user_id: userId
      }
    });
    res
      .status(200)
      .send(` Shift type deleted successfully`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};


exports.updateShiftType = async (req, res) => {
  let id = req.params.id;
  const { userId } = req.params;
  console.log('Update Shifttype ******************', userId);

  try {
    let toBeUpdatedArr = await db.ShiftType.findAll({
      where:
        { shift_type_id: id, user_id: userId }
    });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res
      .status(200)
      .send({ message: `Shift type with id:${id} was updated successfully.` });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};