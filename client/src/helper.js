const helper = {};
helper.sortShiftTypeByName = x => x.sort((a, b) => a.description.localeCompare(b.description));
helper.sortShiftByDate = x => x.sort((a, b) => a.day_number - b.day_number);
helper.sortEmployeesByName = x => x.sort((a, b) => a.name.localeCompare(b.name));

export default helper;