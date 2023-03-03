'use strict';
const db = require('../models');

exports.getAllShifts = async (req, res) => {
  try {
    let shifts = await db.ShiftType.findAll();
    res
      .status(200)
      .send(shifts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error);
  }
};

exports.addShift = async (req, res) => {
  try {
    let newShift = await db.ShiftType.create({
      date: req.body.date,
      peopleRequired: req.body.peopleRequired,
    });
    res
      .status(201)
      .send(newShift);
  } catch (error) {
    res
      .status(400)
      .send({
        errors: error
      });
  }
};

exports.deleteShift = async (req, res) => {
  let id = req.params.id;

  try {
    // await bd.Employee.deleteOne()(req.params.id);
    await db.ShiftType.destroy({
      where: { shift_id: id }
    });
    res
      .status(200)
      .json({
        message: ` Shift deleted successfully`,
      });

  } catch (error) {
    res
      .status(500)
      .send(error);
  }
};


exports.updateShift = async (req, res) => {
  let id = req.params.id;

  try {
    let toBeUpdatedArr = await db.Shift.findAll({ where: { shift_id: id } });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res
      .status(200)
      .send(`Shift with id:${id} was updated successfully.`);

  } catch (error) {
    res
      .status(500)
      .send(error);
  }
};