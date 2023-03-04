import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Allocations from './Allocations';
import EmployeesTable from './EmployeesTable';
import Home from './Home';
import Rota from './Rota';
import Shifts from './Shifts';


function Redirect () {
  return (
    <div className="redirect">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/employees"
          element={<EmployeesTable />} />

        <Route
          path="/shifts"
          element={<Shifts />}
        />

        <Route
          path="/allocations"
          element={<Allocations />}
        />


        <Route
          path="/rota"
          element={<Rota />}
        />

        <Route path="*" element={<h1> Invalid Url</h1>} />
      </Routes>
    </div>
  );
}


export default Redirect;