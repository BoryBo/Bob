
function shiftDuration (start, end) {
  start = start.slice(0, 5).split(':');
  start = parseInt(start[0]) * 60 + parseInt(start[1]);
  end = end.slice(0, 5).split(':');
  end = parseInt(end[0]) * 60 + parseInt(end[1]);
  let delta = (end - start) / 60;
  let isNewDayEnd = delta < 0 ? true : false;
  delta = Math.abs(delta);
  return { delta: Math.round(delta * 100) / 100, isNewDayEnd: isNewDayEnd };
}

function fakeDate (dayNum, time) {
  time = time.slice(0, 5).split(':');
  return new Date(2022, 1, dayNum, time[0], time[1], 0, 0);
}

module.exports.shiftDuration = shiftDuration;
module.exports.fakeDate = fakeDate;