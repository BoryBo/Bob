import React, { useState, useEffect } from 'react';
import './rota.css';
import PersonRow from './PersonRow';
// import helper from '../../helper';

function Rota () {
  const [rota, setRota] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/rota')
      .then(res => {
        if (res.status >= 400) {
          return Promise.reject("Failed to fetch!");
        }
        return res;
      })
      .then(response => response.json())
      .then(data => {
        //TODO:sort by name
        // setRota(helper.sortEmployeesByName(data));
       // console.log(data);
        setRota(data);
      })

      .catch(error => {
        console.log(error);
        setError('Not enough employees to cover the required shifts!');
      });

  }, [setRota]);

  let createDays = () => {
    let res = [...Array(28).keys()].map(x => x + 1);
    return res.map(num => <div key={num} className={`day-num item-${num}`} value={num}> {num}</div>);
  };


  if (error) {
    return <h1 style={{ "color": "red" }}> {error}</h1>;
  }
  return (
    <>
      <div className="grid">
        <div className="item row-header"></div>
        {createDays()}

        {rota.map(
          employee => <PersonRow
            key={employee.employee_id}
            employee={employee}
          ></PersonRow>

        )}
      </div>
    </>);
}

export default Rota;


