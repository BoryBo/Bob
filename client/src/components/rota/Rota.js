import React, { useMemo } from 'react';
import { getRota } from '../../ApiService';
import helper from '../../helper';
import { useFetch } from '../../hooks/useFetch';
import PersonRow from './PersonRow';
import './rota.css';
function Rota ({ shiftTypes }) {
  const {
    isFetching: isLoading,
    fetchedData: rota,
    error
  } = useFetch(getRota, []);

  const sortedRotaNames = useMemo(() => {
    let temp = [...rota];
    return helper.sortByName(temp);
  }, [rota]);

  let abbreviations = [...shiftTypes];
  abbreviations = abbreviations.map(x => x.abbreviation);
  abbreviations = { ...abbreviations };
  abbreviations = Object
    .entries(abbreviations)
    .map(([key, value]) => [value, key]);
  abbreviations = Object.fromEntries(abbreviations);

  let createDays = () => {
    let res = [...Array(28).keys()].map(x => x + 1);
    return res.map(num => (
      <div
        key={num}
        className={`column-header colum-header-${num % 7 === 0 ? 'seventh' : 'week'} `}
        value={num}
      > {num} </div>
    ));
  };

  if (error) {
    return <h2 className='error'> {error.message}</h2>;
  }
  if (isLoading) {
    return <h3 className='error' style={{ color: "whitesmoke" }}>Loading ... </h3>;
  }
  return (
    <>
      <div className="grid">
        <div className="empty"></div>
        {createDays()}

        {sortedRotaNames.map(
          employee => <PersonRow
            abbreviations={abbreviations}
            key={employee.employee_id}
            employee={employee}
          ></PersonRow>
        )}
      </div>
    </>);
}

export default Rota;


