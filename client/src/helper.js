const helper = {};
helper.sortShiftByDate = list => list.sort((a, b) => a.day_number - b.day_number);

helper.sortByDescription = list => {
  return list.sort((a, b) => {
    const nameA = a.description.toUpperCase();
    const nameB = b.description.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};
helper.sortByName = list => {
  return list.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export default helper;