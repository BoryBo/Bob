export type ShiftTypes = {
    abbreviation: string;
    description: string;
    duration: number;
    end: string;
    shift_type_id: number;
    start: string;
}

export type Shifts = {
    day_number: number;
    shift_id: string;
    shift_type_id: number;
    people_required: number;
}

export type Shift = {
  abbreviation: string;
  description: string;
  end: string;
  shift_type_id: number;
  shifts: Shifts[];
  start: string;
}

export type Employees = {
    employee_id: number;
    name: string;
    surname: string;
    email: string;
}

export type Employee = {
    employee_id: number;
    name: string;
    restedEnough: boolean;
    hours: number;
    shifts: Shift[];
}


export type Abbreviations = {
  [key: string]: string,
};