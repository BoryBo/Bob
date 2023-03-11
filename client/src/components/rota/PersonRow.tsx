import PersonShift from "./PersonShift";
import { Abbreviations, Employee } from "../../types";

function PersonRow({ employee, abbreviations }: { employee: Employee, abbreviations: Abbreviations }) {
  const days = [...Array(28).keys()].map(x => x + 1).map(x => {
    const shiftOnDay = employee.shifts.filter((y: any) => y['shifts.day_number'] === x);
    return shiftOnDay.length > 0 ? shiftOnDay[0] : undefined;
  });

  return (
    <>
      <div className="rota-row-header">
        <p >{employee.name}</p>
        <p className="tot-hours">h: {(Number(employee.hours.toFixed(2)))}</p>
      </div>
       {days.map(day  => {
        return day ?
          <PersonShift
            abbreviations={abbreviations}
            key={day.shifts?.[0]?.shift_id ?? Math.floor(Math.random() * 100000)}
            shift={day}
          />
          :
          <p className="shift" key={Math.floor(Math.random() * 100000)}></p>
      })}
    </>
  );
}

export default PersonRow;
