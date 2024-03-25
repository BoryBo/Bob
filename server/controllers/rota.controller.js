'use strict';
const { Op } = require("sequelize");
const db = require('../models');
const { shiftDuration, fakeDate } = require('../convertTime');

const MAX_HOURS = 150;

async function getAllShiftsWithShiftType (userId) {
  try {
    let shiftsCell = await db.ShiftType.findAll({
      where: {
        user_id: userId
      },
      //Eager Loading => https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
      include: [{
        model: db.Shift,
        required: true,
        where: {
          shift_type_id: { [Op.not]: null },
        },
      }],
      //https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object
      raw: true
    });
    return shiftsCell;
  } catch (error) {
    throw new Error("Failed to retrieve shifts and their type.");
  }
};

let getAllEmployees = async (userId) => {
  try {
    let employees = await db.Employee.findAll({
      where: {
        user_id: userId
      }
    });
    employees = employees
      .map(emp => ({
        employee_id: emp.employee_id,
        name: `${emp.name} ${emp.surname}`,
        shifts: [],
        hours: 0
      }));
    return employees;
  } catch (error) {
    throw new Error("Failed to retrieve employee data");
  }
};

async function expandShiftsWithShiftType (userId) {
  let days = {};
  let arrOfArrays = Array(28).fill(null).map((_, i) => (days[i + 1] = []));
  // days =>  { '1': [], '2': [], ...}
  try {

    let shiftsWithShiftType = await getAllShiftsWithShiftType(userId);
    shiftsWithShiftType = shiftsWithShiftType
      .filter(shift => shift['shifts.people_required'] > 0)
      .map(shift => { return { ...shift, 'assignedEmployees': [] }; });
    shiftsWithShiftType.forEach(shift => {
      let dayNumber = shift['shifts.day_number'].toString();
      days[dayNumber].push(shift);
    });
    return days; //each day =>  [{shift...},{shift....}]
  } catch (err) {
    throw new Error("Failed to process shifts");
  }
};

function prioritise (employees, shiftType) {
  let startTime = shiftType.start;
  let startDay = shiftType['shifts.day_number'];
  let comparisonEmployees = employees.map(x => {
    if (x.shifts.at(-1)) {
      let lastShiftEnd = x.shifts.at(-1).end;
      let isNewDayEnd = shiftDuration(x.shifts.at(-1).start, lastShiftEnd).isNewDayEnd;
      let lastShiftDay = x.shifts.at(-1)['shifts.day_number'] + (isNewDayEnd ? 1 : 0);
      let newBegin = fakeDate(startDay, startTime);
      let oldEnd = fakeDate(lastShiftDay, lastShiftEnd);
      let hoursDelta = (newBegin - oldEnd) / 36e5;
      x.restedEnough = hoursDelta >= 11.5;
    } else {
      x.restedEnough = true;
    }
    return x;
  });
  comparisonEmployees = comparisonEmployees
    .filter(x => x.restedEnough)
    .filter(x => x.hours < MAX_HOURS)
    .map(x => x.employee_id);
  return comparisonEmployees;
}

// async function generateRandomRotas (numRotas) {
async function generateRandomRotas (userId) {
  let inpDays = await expandShiftsWithShiftType(userId);
  let inpEmployees = await getAllEmployees(userId);
  let bestRota = [];
  let numRotas = 1;
  for (let i of Array(numRotas)) {
    let days = { ...inpDays };
    let employees = [...inpEmployees];
    // loop for every day
    for (let dayNumber = 1; dayNumber <= 28; dayNumber++) {
      // if no shift is required, go to next day
      if (days[dayNumber].length === 0) {
        continue;
      }

      // loop through each array of shifts in a day
      days[dayNumber].forEach(shiftType => {
        let availablePeople = employees
          .filter(x => prioritise(employees, shiftType).includes(x.employee_id))
          .sort((a, b) => a.hours - b.hours);

        let toBeAssigned = [];
        if (availablePeople.length < shiftType['shifts.people_required']) {
          throw new Error('Insufficient staffing detected.');
        }
        toBeAssigned = availablePeople.slice(0, shiftType['shifts.people_required']);

        // Here goes the logic to update the shifts
        shiftType['assignedEmployees'] = toBeAssigned;

        employees
          .filter(x => toBeAssigned.map(y => y.employee_id).includes(x.employee_id))
          .forEach(x => {
            // Here goes the logic to update the employees
            x.shifts.push(shiftType);
            x.hours = x.hours + shiftDuration(shiftType.start, shiftType.end).delta;
          });
      });
    }
    employees.forEach(x => {
      if (x.shifts.length > 0) {
        // because shifts include employees which include shifts
        x.shifts.forEach(s => delete s.assignedEmployees);
      }
    });
    bestRota = employees;
  }
  return bestRota;
}
//this prints the rota:
// async function logPromiseResult () {
//   console.log(await generateRandomRotas(1));
// }
// logPromiseResult();


exports.getRota = async (req, res) => {
  try {
    const userId = req.params.userId;
    let rota = await generateRandomRotas(userId);
    res
      .status(200)
      .send(rota);
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message });
  }
};

