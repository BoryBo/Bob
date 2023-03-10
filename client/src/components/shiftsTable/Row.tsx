import Cell from './Cell';

type ShiftTypes = {
  abbreviation: string,
  description: string,
  duration: number,
  end: string,
  shift_type_id: number,
  start: string,
};

type Shifts = {
  day_number: number,
  people_required: number,
  shift_id: string,
  shift_type_id: number,
};

function Row({ shiftType, shifts, setShifts }: { shiftType: ShiftTypes, shifts: Shifts[], setShifts: any }) {
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