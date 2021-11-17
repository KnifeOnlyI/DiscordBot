/**
 * Service to manage dates
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class DateService {
  /**
   * Get a formatted string corresponding to the specified date
   *
   * @param date The date to format
   * @param separator The separator character
   *
   * @return A string representation of the specified date (dd-mm-YYYY format)
   */
  static ddmmYYYY(date: Date | undefined, separator = '/') {
    let results = '';

    if (date) {
      const dayNumber = date.getDate();
      const monthNumber = date.getMonth() + 1;

      const day = `${dayNumber < 10 ? '0' : ''}${dayNumber}`;
      const month = `${monthNumber < 10 ? '0' : ''}${monthNumber}`;
      const year = `${date.getFullYear()}`;

      results = `${day}${separator}${month}${separator}${year}`;
    }

    return results;
  }
}
