import dayjs from 'dayjs';

export function generateYearDates() {
  //const firstDayOfYear = dayjs().startOf('year');   
  const firstDayOfYear = dayjs().startOf('year').month(6).date(4);
  //const today = dayjs().add(1, 'day'); 
  const today = new Date()
  const dates = [];
  let compareDate = firstDayOfYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}
