import csvParser from 'csv-parser';
import { Readable } from 'stream';

export class CsvService {
  /**
   * Parses raw CSV text into array of JSON records.
   */
  public static async parseCsv(csvText: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from(csvText);

      stream
        .pipe(csvParser())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  /**
   * Filters out rows containing neither an email nor a phone/mobile key value.
   * This saves AI tokens by rejecting obviously invalid records early.
   */
  public static validateAndFilterRows(rows: any[]): { valid: any[]; skippedCount: number } {
    const valid: any[] = [];
    let skippedCount = 0;

    for (const row of rows) {
      // Find any keys resembling email or mobile/phone
      const keys = Object.keys(row);
      const hasEmail = keys.some(key => {
        const k = key.toLowerCase();
        return (k.includes('email') || k.includes('mail')) && row[key] && row[key].trim() !== '';
      });

      const hasPhone = keys.some(key => {
        const k = key.toLowerCase();
        return (k.includes('phone') || k.includes('mobile') || k.includes('contact') || k.includes('num')) && row[key] && row[key].trim() !== '';
      });

      if (hasEmail || hasPhone) {
        valid.push(row);
      } else {
        skippedCount++;
      }
    }

    return { valid, skippedCount };
  }
}
