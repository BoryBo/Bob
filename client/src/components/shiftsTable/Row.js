import React from 'react';
import Cell from './Cell';

function Row ({ shiftType, shifts, setShifts }) {
  return (
    <>
      <div className="row-header header">{shiftType.abbreviation}</div>

      {shifts.filter(shift => shift.shift_type_id === shiftType.shift_type_id).map(shift =>
        <Cell
          className={`grid-element-${shift.day_number % 7 === 0 ? 'seventh' : 'week'}`}
          key={shift.shift_id}
          setShifts={setShifts}
          shifts={shifts}
          shift={shift}
          def={shift.people_required}
        />
      )}
    </>);
}

export default Row;