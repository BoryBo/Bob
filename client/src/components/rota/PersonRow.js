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
        <p className='tot-hours'>h: {employee.hours}</p>
      </div>
      {days.map(day =>
        day ?
          <PersonShift
            abbreviations={abbreviations}
            key={day['shifts.shift_id']}
            shift={day}
          />
          :
          <p className='shift' key={Math.floor(Math.random() * 100000)}></p>
      )}

    </>
  );
}

export default PersonRow;
