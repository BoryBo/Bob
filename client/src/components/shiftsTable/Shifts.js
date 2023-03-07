import React from 'react';
// import { useState, useEffect } from 'react';
import './shifts.css';
import Row from './Row';

function Shifts ({ shifts, setShifts, shiftTypes }) {


  return (
    <>
      <div className="container">
        <div className="item row-header"></div>
        {(() => {
          let res = [...Array(28).keys()].map(x => x + 1);
          return res.map(x => <div key={x} className={`item item-${x}`} value={x}> {x}</div>);
        })()}

        {shiftTypes.map(
          shiftType => <Row
            key={shiftType.shift_type_id}
            shifts={shifts}
            setShifts={setShifts}
            shiftType={shiftType}
          ></Row>
        )}
      </div>
    </>
  );
};


export default Shifts;