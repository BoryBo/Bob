import { UserButton } from "@clerk/clerk-react";
import React, { useContext, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getEmployees, getShiftTypes, getShifts } from '../ApiService';
import { UserContext } from '../context/UserContext';
import helper from '../helper';
import { useFetch } from '../hooks/useFetch';
import Home from './Home';
import EmployeesTable from './employeesTable/EmployeesTable';
import Rota from './rota/Rota';
import Shifts from './shiftsTable/Shifts';
import ShiftTypes from './shiftsTypes/ShiftTypes';


function Redirect () {
  const { userId } = useContext(UserContext);
  const {
    fetchedData: employees, setFetchedData: setEmployees, error: errorFetchingEmployees, isFetching: isLoadingEmployees
  } = useFetch(getEmployees, [], userId);
  const {
    fetchedData: shiftTypes, setFetchedData: setShiftTypes, error: errorFetchingShiftTypes, isFetching: isLoadingShiftTypes
  } = useFetch(getShiftTypes, [], userId);
  const {
    fetchedData: shifts, setFetchedData: setShifts, error: errorFetchingShifts, isFetching: isLoadingShifts
  } = useFetch(getShifts, [], undefined);

  const sortedEmployees = useMemo(() => {
    if (employees.length > 0) {
      let temp = [...employees];
      return helper.sortByName(temp);
    }
    return employees;
  }, [employees]);

  const sortedShiftTypes = useMemo(() => {
    let temp = [...shiftTypes];
    return helper.sortByDescription(temp);
  }, [shiftTypes]);

  const sortedShifts = useMemo(() => {
    let temp = [...shifts];
    return helper.sortShiftByDate(temp);
  }, [shifts]);

  if (errorFetchingEmployees || errorFetchingShiftTypes || errorFetchingShifts) {
    return <h2 className='error'> {errorFetchingEmployees || errorFetchingShiftTypes || errorFetchingShifts}</h2>;
  }
  if (isLoadingEmployees || isLoadingShiftTypes || isLoadingShifts) {
    return <h3 className='error' style={{ color: "whitesmoke" }}>Loading ... </h3>;
  }

  return (
    <div className="redirect">

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/employees"
          element={<EmployeesTable
            error={errorFetchingEmployees}
            isLoading={isLoadingEmployees}
            employees={sortedEmployees}
            setEmployees={setEmployees}
          />}
        />

        <Route
          path="/shifts"
          element={<Shifts
            shifts={sortedShifts}
            setShifts={setShifts}
            shiftTypes={sortedShiftTypes}
          />}
        />

        <Route
          path="/shift-types"
          element={<ShiftTypes
            shiftTypes={sortedShiftTypes}
            setShiftTypes={setShiftTypes}
            employees={sortedEmployees}
            shifts={sortedShifts}
            setShifts={setShifts}
          />}
        />

        <Route
          path="/rota"
          element={<Rota
            shiftTypes={sortedShiftTypes}
          />}
        />

        <Route path="*" element={<h1> Invalid Url</h1>} />
      </Routes>
      <UserButton showName afterSignOutUrl='/sign-in' />


    </div>
  );
}


export default Redirect;