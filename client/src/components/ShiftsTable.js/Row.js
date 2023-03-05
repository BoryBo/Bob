import React from 'react';
import Cell from './Cell';

function Row ({ shiftType, shifts, setShifts }) {
  return (
    <>
      <div className="item row-header">{shiftType.abbreviation}</div>

      {shifts.filter(shift => shift.shift_type_id === shiftType.shift_type_id).map(shift =>
        <Cell
          key={shift.shift_id}
          setShifts={setShifts}
          shifts={shifts}
          shift={shift}
          def={shift.people_required}
          styling={shiftType.abbreviation}
        />
      )}
    </>);
}

export default Row;