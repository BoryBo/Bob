'use strict';
const db = require('../models');

exports.getAllShifts = async (req, res) => {
  try {
    let shifts = await db.Shift.findAll();
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
    // TODO REMOVE
    console.log(req.body);
    let newShift = await db.Shift.create({
      date: req.body.date,
      people_required: req.body.peopleRequired,
      shift_type_id: req.body.shift_type_id,

      // TODO add a FK with shitftTypeId
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
    await db.Shift.destroy({
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