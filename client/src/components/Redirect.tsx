import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import helper from "../helper";
import ShiftTypes from "./ShiftTypes";
import {
  Employees as EmployeesType,
  ShiftTypes as ShiftTypesType,
  Shifts as ShiftsType,
} from "../types";
import EmployeesTable from "./EmployeesTable";
import Home from "./Home";
import Rota from "./rota/Rota";
import Shifts from "./shiftsTable/Shifts";

function Redirect() {
  const [employees, setEmployees] = useState<EmployeesType[]>([]);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypesType[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/shift-types")
      .then((response) => response.json())
      .then((data) => setShiftTypes(helper.sortShiftTypeByName(data)))
      .catch((error) => console.error(error));
  }, [setShiftTypes]);

  useEffect(() => {
    fetch("http://localhost:4000/shifts")
      .then((response) => response.json())
      .then((data) => setShifts(helper.sortShiftByDate(data)))
      .catch((error) => console.error(error));
  }, [setShifts]);

  return (
    <div className="redirect">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/employees"
          element={
            <EmployeesTable employees={employees} setEmployees={setEmployees} />
          }
        />

        <Route
          path="/shifts"
          element={
            <Shifts
              shifts={shifts}
              setShifts={setShifts}
              shiftTypes={shiftTypes}
            />
          }
        />

        <Route
          path="/shift-types"
          element={
            <ShiftTypes
              shiftTypes={shiftTypes}
              setShiftTypes={setShiftTypes}
              shifts={shifts}
              setShifts={setShifts}
            />
          }
        />

        <Route path="/rota" element={<Rota shiftTypes={shiftTypes} />} />

        <Route path="*" element={<h1> Invalid Url</h1>} />
      </Routes>
    </div>
  );
}

export default Redirect;
