import Cell from './Cell';
import { Shifts, ShiftTypes as ShiftTypesType } from "../../types";

function Row({ shiftType, shifts, setShifts }: { shiftType: ShiftTypesType, shifts: Shifts[], setShifts: React.Dispatch<React.SetStateAction<Shifts[]>> }) {
  return (
    <>
      <div className="row-header header">{shiftType.abbreviation}</div>

      {shifts
        .filter((shift) => shift.shift_type_id === shiftType.shift_type_id)
        .map((shift) => (
          <Cell
            className={`grid-element-${
              shift.day_number % 7 === 0 ? "seventh" : "week"
            }`}
            key={shift.shift_id}
            setShifts={setShifts}
            shifts={shifts}
            shift={shift}
            def={shift.people_required}
          />
        ))}
    </>
  );
}

export default Row;