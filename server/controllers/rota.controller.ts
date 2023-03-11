"use strict";

import { Request, Response } from "express";
import { Employee, Employees, ShiftTypes } from "../types";

const { Op } = require("sequelize");
const db = require("../models");
const { shiftDuration, fakeDate } = require("../convertTime");

const MAXHOURS = 150;

async function getAllShiftsWithShiftType() {
  try {
    let shiftsCell = await db.ShiftType.findAll({
      include: [
        {
          model: db.Shift,
          required: true,
          where: { shift_type_id: { [Op.not]: null } },
        },
      ],
      //https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object
      raw: true,
    });
    return shiftsCell;
  } catch (error) {
    console.log(error);
  }
}

let getAllEmployees = async () => {
  try {
    let temp = await db.Employee.findAll({ raw: true });
    let employees = temp.map((emp: Employees) => ({
      employee_id: emp.employee_id,
      name: `${emp.name} ${emp.surname}`,
      shifts: [],
      hours: 0,
    }));
    return employees;
  } catch (error) {
    console.log(error);
  }
};

async function expandShiftsWithShiftType() {
  let days: Record<string, any> = [...Array(28).keys()].reduce((acc, elem) => {
    return { ...acc, ...{ [elem + 1]: [] } };
  }, {});
  try {
    let inp = await getAllShiftsWithShiftType();
    let out = inp
      .filter((shift: ShiftTypes) => shift["shifts.people_required"] > 0)
      .map((shift: ShiftTypes) => {
        return { ...shift, assignedEmployees: [] };
      });
    out.forEach((shift: ShiftTypes) => {
      let d = shift["shifts.day_number"].toString();
      days[d].push(shift);
    });
    return days;
  } catch (err) {
    console.log(err);
  }
}

function prioritise(employees: Employees[], shiftType: Record<string, any>) {
  let startTime = shiftType.start;
  let startDay = shiftType["shifts.day_number"];
  let comparisonEmployees = employees.map((x: Record<string, any>) => {
    if (x.shifts.at(-1)) {
      let lastShiftEnd = x.shifts.at(-1).end;
      let isNewDayEnd = shiftDuration(
        x.shifts.at(-1).start,
        lastShiftEnd
      ).isNewDayEnd;
      let lastShiftDay =
        x.shifts.at(-1)["shifts.day_number"] + (isNewDayEnd ? 1 : 0);
      let newBegin = fakeDate(startDay, startTime);
      let oldEnd = fakeDate(lastShiftDay, lastShiftEnd);
      var hoursDelta = (newBegin - oldEnd) / 36e5;
      x.restedEnough = hoursDelta >= 11.5;
    } else {
      x.restedEnough = true;
    }
    return x;
  });
  comparisonEmployees = comparisonEmployees
    .filter((x) => x.hours < MAXHOURS)
    .filter((x) => x.restedEnough)
    .map((x) => x.employee_id);
  return comparisonEmployees;
}

// async function generateRandomRotas (numRotas) {
async function generateRandomRotas() {
  let inpDays = await expandShiftsWithShiftType();
  let inpEmployees = await getAllEmployees();
  let bestRota: unknown[] = [];
  let numRotas = 1;
  for (let i of Array(numRotas)) {
    let days: Record<string, any> = { ...inpDays };
    let employees = [...inpEmployees];
    // loop for every day
    for (let dayNumber = 1; dayNumber <= 28; dayNumber++) {
      // if no shift is required, go to next day
      if (days[dayNumber].length === 0) {
        continue;
      }

      // loop through each array of shifts in a day
      (days[dayNumber] ?? []).forEach((shiftType: any) => {
        let availablePeople = employees
          .filter((x) =>
            prioritise(employees, shiftType).includes(x.employee_id)
          )
          .sort((a, b) => a.hours - b.hours);

        let toBeAssigned: any[] = [];
        if (
          availablePeople.length < shiftType ? ["shifts.people_required"] : null
        ) {
          throw new Error(
            "There is an issue with the number of available employees. Check you hired enough"
          );
        }
        toBeAssigned = availablePeople.slice(
          0,
          shiftType["shifts.people_required"]
        );

        // Here goes the logic to update the shifts
        shiftType["assignedEmployees"] = toBeAssigned;

        employees
          .filter((x) =>
            toBeAssigned.map((y) => y.employee_id).includes(x.employee_id)
          )
          .forEach((x) => {
            // Here goes the logic to update the employees
            x.shifts.push(shiftType);
            x.hours =
              x.hours + shiftDuration(shiftType.start, shiftType.end).delta;
          });
      });
    }
    employees.forEach((x) => {
      if (x.shifts.length > 0) {
        // because shifts include employees which include shifts
        x.shifts.forEach((s: any) => delete s.assignedEmployees);
      }
    });
    bestRota = employees;
  }
  return bestRota;
}
//prints the rota
// async function logPromiseResult () {
//   console.log(await generateRandomRotas(1));
// }
// logPromiseResult();

exports.getRota = async (req: Request, res: Response) => {
  try {
    let rota = await generateRandomRotas();
    res.status(200).send(rota);
    // .send({ data: rota, error: null });// handle in the front end
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export {};
