type Shifts = {
  day_number: number;
  people_required: number;
  shift_id: string;
  shift_type_id: number;
};

function Cell({ shift, shifts, setShifts, def, className } : { shift: Shifts, shifts: Shifts[], setShifts: any, def:any, className: String }) { // should check any
  const handleUpdate = (id: String, field: any, value: String) => { // should check type of field
    let updatedShifts = [...shifts].map(shift => shift.shift_id === id ? { ...shift, [field]: value } : shift);
    setShifts(updatedShifts);
  };

  const handleSave = (id: String, field: any, value: String) => {
    fetch(`http://localhost:4000/shift/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    })
      .then(response => response)
      .catch(error => console.error(error));
  };


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