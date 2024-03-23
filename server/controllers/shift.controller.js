'use strict';
const db = require('../models');

exports.getAllShifts = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('get all Shifts ******************', userId);
    let shifts = await db.Shift.findAll({
      where: { user_id: userId }
    });
    res
      .status(200)
      .send(shifts);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};

exports.addShift = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Add Shift  ******************', userId);
    let newShift = await db.Shift.create({
      day_number: req.body.day_number,
      people_required: req.body.people_required,
      shift_type_id: req.body.shift_type_id,
      user_id: userId
    });
    res
      .status(201)
      .send(newShift);
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message });
  }
};

exports.deleteShift = async (req, res) => {
  let id = req.params.id;
  const { userId } = req.params;
  console.log('DeleteShift ******************', userId);
  try {
    await db.Shift.destroy({
      where: { shift_id: id, user_id: userId }
    });
    res
      .status(200)
      .send({ message: `Shift deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};


exports.updateShift = async (req, res) => {
  let id = req.params.id;
  const { userId } = req.params;
  console.log('Update Shift ******************', userId);
  try {
    let toBeUpdatedArr = await db.Shift.findAll({
      where: { shift_id: id, user_id: userId }
    });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res
      .status(200)
      .send({ message: `Shift with id:${id} was updated successfully.` });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};