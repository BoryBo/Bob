import PersonShift from "./PersonShift";

type Employee = {
  employee_id: number;
  name: string;
  email: string;
  restedEnough: boolean;
  hours: number;
  shifts: Shift[]; 
}

type Abbreviations = {
  [key: string]: string;
};

type Shift = {
  abbreviation: string;
  description: string;
  end: string;
  shift_type_id: number;
  shifts: {
    day_number: number;
    people_required: number;
    shift_id: string;
    shift_type_id: number;
  };
  start: string;
}

function PersonRow({ employee, abbreviations }: { employee: Employee, abbreviations: Abbreviations }) {
  let days = [...Array(28).keys()].map(x => x + 1).map(x => { // need to declare type of days and y later
    let shiftOnDay = employee.shifts.filter((y: any) => y["shifts.day_number"] === x); 
    return shiftOnDay.length > 0 ? shiftOnDay[0] : undefined;
  });

  return (
    <>
      <div className="rota-row-header">
        <p >{employee.name}</p>
        <p className="tot-hours">h: {employee.hours}</p>
      </div>
      {days.map(day =>
        day ?
          <PersonShift 
            abbreviations={abbreviations}
            // key={day['shifts.shift_id']} - need to change this key
            shift={day}
          />
          :
          <p className="shift" key={Math.floor(Math.random() * 100000)}></p>
      )}

    </>
  );
}

export default PersonRow;
