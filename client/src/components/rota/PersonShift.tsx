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
type Abbreviations = {
  [key: string]: string,
};

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
