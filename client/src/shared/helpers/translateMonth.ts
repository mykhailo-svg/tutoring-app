const MONTH_TRANSLATIONS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const translateMonth = (month: number) => {
  return MONTH_TRANSLATIONS[month] ?? `${month}`;
};
