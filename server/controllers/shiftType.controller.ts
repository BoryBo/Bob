"use strict";
import { Request, Response } from "express";
const db = require("../models");

exports.getAllShiftTypes = async (req: Request, res: Response) => {
  try {
    let shiftTypes = await db.ShiftType.findAll();
    res.status(200).send(shiftTypes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addShiftType = async (req: Request, res: Response) => {
  try {
    let newShiftType = await db.ShiftType.create({
      description: req.body.description,
      abbreviation: req.body.abbreviation,
      start: req.body.start,
      end: req.body.end,
    });

    res.status(201).send(newShiftType);
  } catch (error) {
    res.status(400).send({
      errors: error,
    });
  }
};

exports.deleteShiftType = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    await db.ShiftType.destroy({
      where: { shift_type_id: id },
    });
    res.status(200).json({
      message: ` Shift type deleted successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateShiftType = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    let toBeUpdatedArr = await db.ShiftType.findAll({
      where: { shift_type_id: id },
    });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res.status(200).send(`Shift type with id:${id} was updated successfully.`);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {};
