import React from 'react';
import { useState, useEffect } from 'react';
import './home.css';

let ran = () => Math.floor(Math.random() * 100);

function Cell ({ def, elementNumber }) {
  return (
    <>
      <input className={`inp ${elementNumber}`} type="text" name="description" defaultValue={def} />
    </>);
}

function Row ({ header }) {
  return (
    <>
      <div className="item row-header">{header}</div>
      <Cell def={ran()} elementNumber={"inp1"}></Cell>
      <Cell def={ran()} elementNumber={"inp2"}></Cell>
      <Cell def={ran()} elementNumber={"inp3"}></Cell>
      <Cell def={ran()} elementNumber={"inp4"}></Cell>
      <Cell def={ran()} elementNumber={"inp5"}></Cell>
      <Cell def={ran()} elementNumber={"inp6"}></Cell>
      <Cell def={ran()} elementNumber={"inp7"}></Cell>
    </>);
}

function Home ({ shifts, setShifts, shiftTypes }) {
  console.log(shifts);

  return (
    <>
      <div className="container">
        <div className="item row-header"></div>
        <div className="item item-1"> 1</div>
        <div className="item item-2"> 2</div>
        <div className="item item-3"> 3</div>
        <div className="item item-4"> 4</div>
        <div className="item item-5"> 5</div>
        <div className="item item-6"> 6</div>
        <div className="item item-7"> 7</div>

        {shiftTypes.map(
          shiftType => <Row key={shiftType.shift_type_id} header={shiftType.abbreviation}></Row>
        )}
      </div>
    </>
  );
}

export default Home;