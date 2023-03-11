"use strict";
import { Request, Response } from "express";
const db = require("../models");

exports.getAllShifts = async (req: Request, res: Response) => {
  try {
    let shifts = await db.Shift.findAll();
    res.status(200).send(shifts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addShift = async (req: Request, res: Response) => {
  try {
    let newShift = await db.Shift.create({
      day_number: req.body.day_number,
      people_required: req.body.people_required,
      shift_type_id: req.body.shift_type_id,
    });

    res.status(201).send(newShift);
  } catch (error) {
    res.status(400).send({
      errors: error,
    });
  }
};

exports.deleteShift = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    await db.Shift.destroy({
      where: { shift_id: id },
    });
    res.status(200).json({
      message: ` Shift deleted successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateShift = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    let toBeUpdatedArr = await db.Shift.findAll({ where: { shift_id: id } });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res.status(200).send(`Shift with id:${id} was updated successfully.`);
  } catch (error) {
    res.status(500).send(error);
  }
};
