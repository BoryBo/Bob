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
