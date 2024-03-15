import { useState } from 'react';
import { updateShift } from '../../ApiService';

function Cell ({ shift, shifts, setShifts, def, className }) {
  const [error, setError] = useState(null);

  const handleUpdate = (id, field, value) => {
    let updatedShifts = [...shifts];
    updatedShifts = updatedShifts.map(shift => shift.shift_id === id ? { ...shift, [field]: value } : shift);
    setShifts(updatedShifts);
  };

  const handleSave = (id, field, value) => {
    updateShift(id, field, value)
      .catch(error => setError({ message: error.message || 'Failed to delete employee.' }));
  };

  if (error) {
    return <h2 className='error'> {error.message}</h2>;
  }
  return (

    <>
      <input
        type='text'
        defaultValue={def}
        className={`grid-element ${className}`}
        name='people_required'
        onChange={(ev) => handleUpdate(shift.shift_id, 'people_required', ev.target.value)}
        onBlur={(ev) => handleSave(shift.shift_id, 'people_required', ev.target.value)}
      />
    </>);
}

export default Cell;