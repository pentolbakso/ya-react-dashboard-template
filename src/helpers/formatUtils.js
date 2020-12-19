import dayjs from 'dayjs';

export function calculateAge(bornYear) {
  if (!bornYear) return '';
  let val = Number.parseInt(bornYear);
  if (val) {
    let now = Number.parseInt(dayjs().format('YYYY'));
    return `${now - val} th`;
  }
  return '';
}
