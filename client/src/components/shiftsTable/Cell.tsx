import { Shifts } from "../../types";

function Cell({ shift, shifts, setShifts, def, className } : { shift: Shifts, shifts: Shifts[], setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>, def:string | number | readonly string[] | undefined, className: string }) { 
  const handleUpdate = (id: string, field: string, value: string) => {
    let updatedShifts = [...shifts].map(shift => shift.shift_id === id ? { ...shift, [field]: value } : shift);
    setShifts(updatedShifts);
  };

  const handleSave = (id: string, field: string, value: string) => {
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