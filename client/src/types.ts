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
    people_required: string
}

export type Employees = {
    employee_id: number;
    name: string;
    surname: string;
    email: string;
}