import { Shifts } from "../../types";
import * as ApiService from "../../ApiService";

function Cell({
  shift,
  shifts,
  setShifts,
  def,
  className,
}: {
  shift: Shifts;
  shifts: Shifts[];
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
  def: string | number | readonly string[] | undefined;
  className: string;
}) {
  const handleUpdate = (id: string, field: string, value: string) => {
    let updatedShifts = [...shifts].map((shift) =>
      shift.shift_id === id ? { ...shift, [field]: value } : shift
    );
    setShifts(updatedShifts);
  };

  const handleSave = (id: string, field: string, value: string) => {
    ApiService.changeShift(id, field, value);
  };

  return (
    <>
      <input
        type="text"
        defaultValue={def}
        className={`grid-element ${className}`}
        name="people_required"
        onChange={(ev) =>
          handleUpdate(shift.shift_id, "people_required", ev.target.value)
        }
        onBlur={(ev) =>
          handleSave(shift.shift_id, "people_required", ev.target.value)
        }
      />
    </>
  );
}

export default Cell;
