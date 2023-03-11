import { Shift, Abbreviations } from "../../types";

function PersonShift({ shift, abbreviations }: { shift: Shift, abbreviations: Abbreviations }) {
  return (
    <>
      <div className={`shift shift-${abbreviations[shift.abbreviation]}`}>
        {shift.abbreviation}
      </div>
    </>
  );
}

export default PersonShift;
