'use strict';
const { Op } = require("sequelize");
const db = require('../models');

async function getAllShiftsWithShiftType () {
  try {
    let shifts = await db.ShiftType.findAll({
      include: [{
        model: db.Shift,
        required: true,
        where: { shift_type_id: { [Op.not]: null } },
      }],
      //https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object
      raw: true
    });
    return shifts;
  } catch (error) {
    console.log(error);
  }

};

let getAllEmployees = async () => {
  try {
    let employees = await db.Employee.findAll({ raw: true });
    return employees;
  } catch (error) {
    console.log(error);
  }
};

async function expandShiftsWithShiftType () {
  let days = [...Array(28).keys()].reduce((acc, elem) => { return { ...acc, ...{ [elem + 1]: [] } }; }, {});
  try {
    let inp = await getAllShiftsWithShiftType();
    let out = inp
      .filter(shift => shift['shifts.people_required'] > 0)
      .map(shift => { return { ...shift, 'assignedEmployees': [] }; });
    out.forEach(shift => {
      let d = shift['shifts.day_number'].toString();
      days[d].push(shift);
    });
    return days;
  } catch (err) {
    console.log(err);
  }
};

async function generateRandomRotas (numRotas) {
  let days = await expandShiftsWithShiftType();
  let employees = await getAllEmployees();
  let bestRota = 12;
  for (let i of Array(numRotas)) {

    let peopleInPreviousDay = [];
    for (let d = 1; d <= 28; d++) {
      let assignedPeople = [];
      // if no shift is required, go to next day
      if (days[d].length === 0) {
        peopleInPreviousDay = [];
        continue;
      }

      let availablePeople = employees
        .filter(i => !peopleInPreviousDay.includes(i.employee_id));

      // console.log(`Day ${d} available people: `, availablePeople);

      // loop through each array of shifts in a day
      days[d].forEach(shiftType => {
        for (let i of Array(shiftType['shifts.people_required'])) {
          //TODO: error handling if no availablePeople
          let randIdx = Math.floor(Math.random() * availablePeople.length);
          let toBeAssigned = availablePeople.splice(randIdx, 1)[0];
          shiftType['assignedEmployees'].push(toBeAssigned);

          assignedPeople.push(toBeAssigned.employee_id);
        }

      });
      peopleInPreviousDay = assignedPeople;
      // console.log(days[d]);
    }
    // TODO: evaluate this rota against existing one
    // console.log(employees);
    console.log(days);
  }

}

generateRandomRotas(1);

// function scoreRota (rota) {
//   let score = 0;
//   return score;
// }

// function improveRota (rota) {
//   return 0;
// }

// function saveRota () {
//   return 0;
// }

// module.exports.getAllShiftsWithShiftType = getAllShiftsWithShiftType;
// module.exports.expandShiftsWithShiftType = expandShiftsWithShiftType;