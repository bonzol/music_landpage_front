export class DateConverter {
  dateConverter = (
    year: number,
    month: number,
    lang: string = 'heb'
  ): string => {
    const engMonths = [
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
    const hebMonths = [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
    ];
    return lang == 'heb'
      ? year.toString() + ' ' + hebMonths[month]
      : engMonths[month] + ' ' + year.toString();
  };
}
