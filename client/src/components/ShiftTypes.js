import React from 'react';
import { useState, useEffect } from 'react';
import helper from '../helper';

function ShiftTypes ({ shiftTypes, setShiftTypes }) {
  const [newShiftType, setNewShiftType] = useState({ description: '', abbreviation: '', start: '', end: '' });



  useEffect(() => {
    fetch('http://localhost:4000/shift-types')
      .then(response => response.json())
      .then(data => setShiftTypes(helper.sortShiftTypeByName(data)))
      .catch(error => console.error(error));
  }, [setShiftTypes]);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/shift-type/${id}`, {
      method: 'DELETE',
    })
      .then(() => setShiftTypes(shiftTypes.filter(shift => shift.shift_type_id !== id)))
      .catch(error => console.error(error));
  };

  const handleAdd = () => {
    // Create new shift-type
    fetch('http://localhost:4000/shift-type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShiftType),
    })
      .then(response => {
        let out = response.json();
        console.log(out);
        // Create 28 new empty shifts
        // for (let i = 1; i <= 28; i++) {
        //   fetch('http://localhost:4000/shift', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //       // shift_id:"",
        //       people_required: 42,
        //       shift_type_id: out['shift_type_id'],
        //     }),
        //   })
        //     .then(r => r.json())
        //     .catch(error => console.error(error));
        // }
        return out;
      })
      .then(data => {
        let updatedList = [...shiftTypes, data];
        setShiftTypes(helper.sortShiftTypeByName(updatedList));
      })
      .catch(error => console.error(error));


    setNewShiftType({ description: '', abbreviation: '', start: '', end: '' });
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setNewShiftType({ ...newShiftType, [name]: value });
  };

  const handleUpdate = (id, field, value) => {
    let updatedShifts = [...shiftTypes];
    updatedShifts = updatedShifts.map(shift => shift.shift_type_id === id ? { ...shift, [field]: value } : shift);
    setShiftTypes(helper.sortShiftTypeByName(updatedShifts));
  };

  const handleSave = (id, field, value) => {
    fetch(`http://localhost:4000/shift-type/${id}`, {
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
          <th>Type</th>
          <th>Abbreviation</th>
          <th>Start</th>
          <th>End</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {shiftTypes.map(shiftType => (

          <tr key={shiftType.shift_type_id}>
            <td>
              <input type="text" defaultValue={shiftType.description}
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'description', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'description', ev.target.value)}
              />
            </td>
            <td>
              <input type="text" defaultValue={shiftType.abbreviation}
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'abbreviation', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'abbreviation', ev.target.value)}
              />
            </td>
            <td>
              <input type="time" defaultValue={shiftType.start}
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'start', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'start', ev.target.value)}
              />
            </td>
            <td>
              <input type="time" defaultValue={shiftType.end}
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'end', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'end', ev.target.value)}
              />
            </td>
            <td>
              <button onClick={() => handleDelete(shiftType.shift_type_id)}>X</button>
            </td>
          </tr>
        ))}

        <tr>
          <td>
            <input type="text" name="description" value={newShiftType.description} onChange={handleInputChange} />
          </td>
          <td>
            <input type="text" name="abbreviation" value={newShiftType.abbreviation} onChange={handleInputChange} />
          </td>
          <td>
            <input type="time" name="start" value={newShiftType.start} onChange={handleInputChange} />
          </td>
          <td>
            <input type="time" name="end" value={newShiftType.end} onChange={handleInputChange} />
          </td>
          <td>
            <button onClick={handleAdd}>Add </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export default ShiftTypes;