import { useState, useEffect } from 'react';
import './rota.css';
import PersonRow from './PersonRow';

type ShiftTypes = {
    abbreviation: string;
    description: string;
    duration: number;
    end: string;
    shift_type_id: number;
    start: string;
}

function Rota({ shiftTypes }: { shiftTypes: ShiftTypes[] }) {
  const [rota, setRota] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const abbreviations = Object.fromEntries(Object.entries({
    ...[...shiftTypes].map((x) => x.abbreviation),
  }).map(([key, value]) => [value, key]));

  useEffect(() => {
    fetch("http://localhost:4000/rota")
      .then((res) => {
        if (res.status >= 400) {
          return Promise.reject("Failed to fetch!");
        }
        return res;
      })
      .then((response) => response.json())
      .then((data) => {
        setRota(data);
      })

      .catch((error) => {
        setError("Not enough employees to cover the required shifts!");
      });
  }, [setRota]);

  let createDays = () => {
    let res = [...Array(28).keys()].map((x) => x + 1);
    return res.map((num) => (
      <div
        key={num}
        className={`column-header colum-header-${
          num % 7 === 0 ? "seventh" : "week"
        } `}
        data-value={num}
      >
        {" "}
        {num}
      </div>
    ));
  };


  if (error) {
    return <h1 style={{ color: "red" }}> {error}</h1>;
  }
  return (
    <>
      <div className="grid">
        <div className="empty"></div>
        {createDays()}

        {rota.map((employee) => (
          <PersonRow
            abbreviations={abbreviations}
            // key={employee.employee_id} // need to change this key
            employee={employee}
          ></PersonRow>
        ))}
      </div>
    </>
  );
}

export default Rota;


