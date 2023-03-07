import React from 'react';
import PersonShift from './PersonShift';



function PersonRow ({ employee }) {
  let days = [...Array(28).keys()].map(x => x + 1);
  days = days.map(x => {
    let shiftOnDay = employee.shifts.filter(y => y['shifts.day_number'] === x);
    return shiftOnDay.length > 0 ? shiftOnDay[0] : undefined;
  });
  return (
    <>
      <div className="row-header">
        <div>{employee.name}</div>
        <h6 className='tot-hours'>Tot. houres: {employee.hours}</h6>
      </div>
      {days.map(day =>
        day ?
          <PersonShift
            key={day['shifts.shift_id']}
            shift={day}
          />
          :
          <p key={Math.floor(Math.random() * 100000)}>Off</p>
      )}

    </>
  );
}

export default PersonRow;
