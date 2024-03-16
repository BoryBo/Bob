import React, { useState } from 'react';
import { MdDownloadDone } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { addNewShift, addShiftType, deleteShiftType, updateShiftType } from '../../ApiService';
import helper from '../../helper';
import './shiftTypes.css';

function ShiftTypes ({ shiftTypes, setShiftTypes, shifts, setShifts }) {
  const [newShiftType, setNewShiftType] = useState({ description: '', abbreviation: '', start: '', end: '' });
  const [newShift, setNewShift] = useState({
    day_number: '',
    people_required: 0,
    shift_type_id: '',
  });
  const [errorAddingShift, setErrorAddingShift] = useState(null);
  const [errorAddingShiftType, setErrorAddingShiftType] = useState(null);
  const [errorDeletingShiftType, setErrorDeletingShiftType] = useState(null);
  const [errorUpdatingShiftType, setErrorUpdatingShiftType] = useState(null);

  const handleDelete = (id) => {
    deleteShiftType(id)
      .then(() => setShiftTypes(shiftTypes.filter(shift => shift.shift_type_id !== id)))
      .catch(error => setErrorDeletingShiftType({ message: error.message || 'Failed to delete shift.' }));
  };

  async function addShift (day_number, shift_type_id) {
    // This function adds a shift with people_required = 0 by default:
    const updatedShift = { ...newShift, day_number, shift_type_id };
    let shift = await addNewShift(updatedShift)
      .catch(error => setErrorAddingShift({ message: error.message || 'Failed to add shift.' }));
    setNewShift(updatedShift);
    return shift;
  }

  async function handleAdd () {
    const newShiftTypeId = await addShiftType(newShiftType)
      .catch(error => setErrorAddingShiftType({ message: error.message || 'Failed to add shift.' }));
    let updatedList = [...shiftTypes, newShiftTypeId];
    setShiftTypes(helper.sortByDescription(updatedList));

    // Creating 28 placeholder shifts associated with the new shift type
    // so that the shift table is pre-populated:
    let newShifts = [...Array(28).keys()].map(x => x + 1);
    newShifts = await Promise.all(newShifts.map(async (shift) => {
      return addShift(shift, newShiftTypeId.shift_type_id);
    }));
    //updating shifts:
    setShifts([...shifts, ...newShifts]);
    setNewShiftType({ description: '', abbreviation: '', start: '', end: '' });
  }

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setNewShiftType({ ...newShiftType, [name]: value });
  };

  const handleUpdate = (id, field, value) => {
    let updatedShifts = [...shiftTypes];
    updatedShifts = updatedShifts.map(shift =>
      shift.shift_type_id === id ? { ...shift, [field]: value } : shift
    );
    setShiftTypes(helper.sortByDescription(updatedShifts));
  };

  const handleSave = (id, field, value) => {
    updateShiftType(id, field, value)
      // .then(response => response)
      .catch(error => setErrorUpdatingShiftType({ message: error.message || 'Failed to update shift.' }));
  };

  if (errorAddingShift) {
    return <h2 className='error'> {errorAddingShift.message}</h2>;
  }
  if (errorAddingShiftType) {
    return <h2 className='error'> {errorAddingShiftType.message}</h2>;
  }
  if (errorDeletingShiftType) {
    return <h2 className='error'> {errorDeletingShiftType.message}</h2>;
  }
  if (errorUpdatingShiftType) {
    return <h2 className='error'> {errorUpdatingShiftType.message}</h2>;
  }

  return (
    <table className='shifts-table'>
      <thead>
        <tr className='table-head'>
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
              <input type="text" defaultValue={shiftType.description} className='shift-input'
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'description', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'description', ev.target.value)}
              />
            </td>
            <td>
              <input type="text" defaultValue={shiftType.abbreviation} className='shift-input abr'
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'abbreviation', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'abbreviation', ev.target.value)}
              />
            </td>
            <td>
              <input type="time" defaultValue={shiftType.start} className='shift-input'
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'start', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'start', ev.target.value)}
              />
            </td>
            <td>
              <input type="time" defaultValue={shiftType.end} className='shift-input'
                onChange={(ev) => handleUpdate(shiftType.shift_type_id, 'end', ev.target.value)}
                onBlur={(ev) => handleSave(shiftType.shift_type_id, 'end', ev.target.value)}
              />
            </td>
            <td>
              <button className='shift-btn delete-btn' onClick={() => handleDelete(shiftType.shift_type_id)}><TiDeleteOutline /></button>
            </td>
          </tr>
        ))}

        <tr className='add-form'>
          <td>
            <input className='add-input' type="text" name="description" value={newShiftType.description} onChange={handleInputChange} />
          </td>
          <td>
            <input className='add-input' type="text" name="abbreviation" value={newShiftType.abbreviation} onChange={handleInputChange} />
          </td>
          <td>
            <input className='add-input' type="time" name="start" value={newShiftType.start} onChange={handleInputChange} />
          </td>
          <td>
            <input className='add-input' type="time" name="end" value={newShiftType.end} onChange={handleInputChange} />
          </td>
          <td>
            <button className='shift-btn add-btn' onClick={handleAdd}><MdDownloadDone /> </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export default ShiftTypes;
