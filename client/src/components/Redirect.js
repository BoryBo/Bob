import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import helper from '../helper';
import ShiftTypes from './ShiftTypes';
import EmployeesTable from './EmployeesTable';
import Home from './Home';
import Rota from './rota/Rota';
import Shifts from './shiftsTable/Shifts';


function Redirect () {
  const [employees, setEmployees] = useState([]);
  const [shiftTypes, setShiftTypes] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/shift-types')
      .then(response => response.json())
      .then(data => setShiftTypes(helper.sortShiftTypeByName(data)))
      .catch(error => console.error(error));
  }, [setShiftTypes]);

  useEffect(() => {
    fetch('http://localhost:4000/shifts')
      .then(response => response.json())
      .then(data => setShifts(helper.sortShiftByDate(data)))
      .catch(error => console.error(error));
  }, [setShifts]);

  // useEffect(() => {
  //   fetch('http://localhost:4000/rota')
  //     .then(response => response.json())
  //     .then(data => setRota(data))
  //     .catch(error => console.error(error));
  // }, [setRota]);

  return (
    <div className="redirect">
      <Routes>
        <Route
          path="/"
          element={<Home
            shifts={shifts}
            setShifts={setShifts}
            shiftTypes={shiftTypes}
          />}
        />

        <Route
          path="/employees"
          element={<EmployeesTable
            employees={employees}
            setEmployees={setEmployees}
          />} />

        <Route
          path="/shifts"
          element={<Shifts
            shifts={shifts}
            setShifts={setShifts}
            shiftTypes={shiftTypes}
          />}
        />

        <Route
          path="/shift-types"
          element={<ShiftTypes
            shiftTypes={shiftTypes}
            setShiftTypes={setShiftTypes}
            employees={employees}
            shifts={shifts}
            setShifts={setShifts}
          />}
        />


        <Route
          path="/rota"
          element={<Rota
          />}
        />

        <Route path="*" element={<h1> Invalid Url</h1>} />
      </Routes>
    </div>
  );
}


export default Redirect;