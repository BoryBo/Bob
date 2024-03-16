import React from 'react';
import PersonShift from './PersonShift';

function PersonRow ({ employee, abbreviations }) {
  let days = [...Array(28).keys()].map(x => x + 1);
  days = days.map(x => {
    let shiftOnDay = employee.shifts.filter(y => y['shifts.day_number'] === x);
    return shiftOnDay.length > 0 ? shiftOnDay[0] : undefined;
  });

  return (
    <>
      <div className="rota-row-header">
        <p >{employee.name}</p>
        <p className='tot-hours'> {(150 - employee.hours).toFixed(2)} h left</p>
      </div>
      {days.map((day, i) =>
        day ?
          <PersonShift
            abbreviations={abbreviations}
            key={day['shifts.shift_id']}
            shift={day}
          />
          :
          <p className='shift' key={`${employee.name} ${i}`}></p>
      )}

    </>
  );
}

export default PersonRow;
