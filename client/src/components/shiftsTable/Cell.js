import { useState } from 'react';
import { updateShift } from '../../ApiService';

function Cell ({ shift, shifts, setShifts, def, className }) {
  const [error, setError] = useState(null);
  const [shiftState, setShiftState] = useState({ ...shift });

  const handleChange = (id, field, value) => {
    if (value !== '' && isNaN(value)) {
      setError({ message: 'Please enter a valid number.' });
      return;
    }
    const updatedValue = value || 0;
    const updatedShift = { ...shiftState, [field]: updatedValue };
    let updatedShifts = [...shifts];
    updatedShifts = updatedShifts.map(shift => shift.shift_id === id ? updatedShift : shift);
    updateShift(id, updatedShift)
      .catch(error => setError({ message: error.message || 'Failed to update shift.' }));
    setShiftState(updatedShift);
    setShifts(updatedShifts);
  };

  if (error) {
    return <h2 className='error' > <p >{error.message}</p></h2>;
  }
  return (

    <>
      <input
        type='text'
        defaultValue={def}
        className={`grid-element ${className}`}
        name='people_required'
        onChange={(ev) => handleChange(shift.shift_id, 'people_required', ev.target.value)}
        onBlur={(ev) => handleChange(shift.shift_id, 'people_required', ev.target.value)}
      />
    </>);
}

export default Cell;