import './shifts.css';
import Row from './Row';

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

function Shift ({ shifts, setShifts, shiftTypes } : { shifts: Shifts[], setShifts: any, shiftTypes: ShiftTypes[] }) {
  return (
    <div className="container">
      <div className="empty"></div>
      {(() => {
        let res = [...Array(28).keys()].map(x => x + 1);
        return res.map(x => <div key={x} className={`header colum-header-${x % 7 === 0 ? 'seventh' : 'week'} column-header`} data-value={x}> {x}</div>);
      })()}

      {shiftTypes.map(
        shiftType => <Row
          key={shiftType.shift_type_id}
          shifts={shifts}
          setShifts={setShifts}
          shiftType={shiftType}
        ></Row>
      )}
    </div>
  );
};


export default Shift;