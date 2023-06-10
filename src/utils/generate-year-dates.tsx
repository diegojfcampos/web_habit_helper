import dayjs from 'dayjs';

export function generateYearDates() {
  //const firstDayOfYear = dayjs().startOf('year');   
  const firstDayOfYear = dayjs().startOf('year').month(4).date(7);
  const today = dayjs().subtract(1, 'day'); 
  const dates = [];
  let compareDate = firstDayOfYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}
