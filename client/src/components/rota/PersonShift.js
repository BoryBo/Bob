import React from 'react';

function PersonShift ({ shift, abbreviations }) {
  return (
    <>
      <div
        type='text'
        name='single_shift'
        className={`shift shift-${abbreviations[shift.abbreviation]}`}
      >
        {shift.abbreviation}
      </div>
    </>
  );
}

export default PersonShift;

// let shift = {
//   "shift_type_id": 25,
//   "abbreviation": "N",
//   "description": "Night",
//   "start": "20:00:00",
//   "end": "08:30:00",
//   "shifts.shift_id": "592",
//   "shifts.day_number": 6,
//   "shifts.people_required": 2,
//   "shifts.shift_type_id": 25
// };