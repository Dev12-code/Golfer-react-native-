// import moment from 'moment'
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const timeFormatter = (cDate) => {
  let arr = cDate.split(' ');
  let diffStatement = '';
  const now = new Date();
  const [year, month, day] = arr[0].split('-');
  const [hrs, mints, seconds] = arr[1].split(':');
  let date = Date.UTC(year, month, day, hrs, mints, seconds);
  date = new Date(new Date(date).getTime() + 240 * 60 * 1000);
  date = new Date(date);
  if (dateDiffInDays(date, now) < 1) {
    const {hours, minutes} = difference(date, now);
    if (hours > 1) {
      diffStatement = `${hours} hours ago`;
    } else if (hours === 1) {
      diffStatement = `${hours} hour ago`;
    } else if (hours === 0 && minutes === 1) {
      diffStatement = `${minutes} minute ago`;
    } else if (hours === 0 && minutes > 1) {
      diffStatement = `${minutes} minutes ago`;
    } else if (hours === 0 && minutes < 1) {
      diffStatement = 'now';
    }
  } else {
    diffStatement = date.toLocaleString();
  }
  return diffStatement;
};

function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  // const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  // const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((b - a) / _MS_PER_DAY);
}

function difference(prevDate, latestDate) {
  let seconds = Math.floor((latestDate - prevDate) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    hours,
    minutes,
    seconds,
  };
}
