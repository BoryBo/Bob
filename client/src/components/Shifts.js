import React from 'react';
import { useState, useEffect } from 'react';
import helper from '../helper';

function Shifts ({ shifts, setShifts, shiftTypes }) {
  const [newShift, setNewShift] = useState({ date: '', peopleRequired: '' });

  // const helper.sortShiftByDate = x => x.sort((a, b) => new Date(a.date) - new Date(b.date));



  useEffect(() => {
    fetch('http://localhost:4000/shifts')
      .then(response => response.json())
      .then(data => setShifts(helper.sortShiftByDate(data)))
      .catch(error => console.error(error));
  }, [setShifts]);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/shift/${id}`, {
      method: 'DELETE',
    })
      .then(() => setShifts(shifts.filter(shift => shift.shift_id !== id)))
      .catch(error => console.error(error));
  };

  const handleAdd = () => {
    fetch('http://localhost:4000/shift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShift),
    })
      .then(response => response.json())
      .then(data => {
        //TODO:

        // if (Date.parse(data.date) > Date.now()) {
        let updatedList = [...shifts, data];
        setShifts(helper.sortShiftByDate(updatedList));
        // }else{
        //   alert ('Invalid input. Date cannot be in the past. ');
        // }
      })
      .catch(error => console.error(error));

    setNewShift({ date: '', peopleRequired: '' });
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleUpdate = (id, field, value) => {
    let updatedShifts = [...shifts];
    updatedShifts = updatedShifts.map(shift => shift.shift_id === id ? { ...shift, [field]: value } : shift);
    setShifts(helper.sortShiftByDate(updatedShifts));
  };

  const handleSave = (id, field, value) => {
    fetch(`http://localhost:4000/shift/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    })
      .then(response => response)
      .catch(error => console.error(error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Number of shifts needed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {shifts.map(shift => (

          <tr key={shift.shift_id}>
            <td>
              <input type="text" defaultValue={shift.date}
                onChange={(ev) => handleUpdate(shift.shift_id, 'date', ev.target.value)}
                onBlur={(ev) => handleSave(shift.shift_id, 'date', ev.target.value)}
              />
            </td>
            <td>
              <input type="text" defaultValue={shift.peopleRequired}
                onChange={(ev) => handleUpdate(shift.shift_id, 'peopleRequired', ev.target.value)}
                onBlur={(ev) => handleSave(shift.shift_id, 'peopleRequired', ev.target.value)}
              />
            </td>
            <td>
              <button onClick={() => handleDelete(shift.shift_id)}>X</button>
            </td>
          </tr>
        ))}

        <tr>
          <td>
            <input type="date" name="date" value={newShift.date} onChange={handleInputChange} />
          </td>
          <td>
            <input type="number" name="peopleRequired" value={newShift.peopleRequired} onChange={handleInputChange} />
          </td>
          <td>
            <button onClick={handleAdd}>Add </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export default Shifts;