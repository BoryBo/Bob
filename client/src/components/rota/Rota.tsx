import { useState, useEffect } from 'react';
import './rota.css';
import PersonRow from './PersonRow';
import { Employee, ShiftTypes as ShiftTypesType } from "../../types";
import * as ApiService from "../../ApiService";

function Rota({ shiftTypes }: { shiftTypes: ShiftTypesType[] }) {
  const [rota, setRota] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abbreviations = Object.fromEntries(Object.entries({
    ...[...shiftTypes].map((x) => x.abbreviation),
  }).map(([key, value]) => [value, key]));

  useEffect(() => {
    ApiService.getRota()
      .then((data) => {setRota(data);})
      .catch((error) => {
        setError("Not enough employees to cover the required shifts!");
      });
  }, [setRota]);

  const createDays = () => {
    const res = [...Array(28).keys()].map((x) => x + 1);
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
            key={employee.employee_id}
            employee={employee}
          ></PersonRow>
        ))}
      </div>
    </>
  );
}



export default Rota;


