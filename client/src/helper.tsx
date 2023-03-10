import { ShiftTypes, Shifts, Employees } from './types';
const sortShiftTypeByName = (x: ShiftTypes[]) => x.sort((a, b) => a.description.localeCompare(b.description))

const sortShiftByDate = (x: Shifts[]) => x.sort((a, b) => a.day_number - b.day_number)

const sortEmployeesByName = (x: Employees[]) => x.sort((a, b) => a.name.localeCompare(b.name))

export default {sortShiftTypeByName, sortShiftByDate, sortEmployeesByName}