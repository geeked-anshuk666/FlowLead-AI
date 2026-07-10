import csvParser from 'csv-parser';
import { Readable } from 'stream';

export class CsvService {
  /**
   * EC4: Sanitize raw CSV buffer/text before parsing.
   * Strips UTF-8 BOM (\uFEFF), normalizes CRLF to LF, removes null bytes,
   * and sanitizes control characters that can corrupt CSV parsing.
   */
  public static sanitizeCsvText(raw: string): string {
    // Strip UTF-8 BOM that Excel often prepends (causes first header to have invisible \uFEFF prefix)
    let text = raw.replace(/^\uFEFF/, '');

    // Normalize Windows CRLF → Unix LF
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Remove null bytes and other non-printable control characters (except tab & newline)
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    return text;
  }

  /**
   * EC6: Normalize a single header key to lowercase snake_case.
   * Handles camelCase, PascalCase, spaces, hyphens, and mixed separators.
   * e.g. "Mobile Number" → "mobile_number", "mobileWithoutCountryCode" → "mobile_without_country_code"
   */
  public static normalizeHeader(key: string): string {
    return key
      .trim()
      // Handle camelCase / PascalCase boundaries: insert underscore before uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      // Replace spaces, hyphens, dots, and other common separators with underscore
      .replace(/[\s\-\.]+/g, '_')
      // Collapse multiple underscores
      .replace(/_+/g, '_')
      // Strip leading/trailing underscores
      .replace(/^_|_$/g, '')
      .toLowerCase();
  }

  /**
   * EC6: Re-key all rows so headers are normalized to snake_case.
   * This ensures downstream AI mapping receives consistent field names
   * regardless of how the source CSV formatted the header row.
   */
  public static normalizeRowHeaders(rows: any[]): any[] {
    return rows.map(row => {
      const normalized: Record<string, any> = {};
      for (const [key, value] of Object.entries(row)) {
        const normalKey = this.normalizeHeader(key);
        // If two headers normalize to the same key, keep the first (don't overwrite)
        if (!(normalKey in normalized)) {
          normalized[normalKey] = value;
        }
      }
      return normalized;
    });
  }

  /**
   * Parses sanitized CSV text into array of JSON records.
   */
  public static async parseCsv(csvText: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from(csvText);

      stream
        .pipe(csvParser({
          // EC6: Provide a mapHeaders option to normalize all header names during parse
          mapHeaders: ({ header }) => this.normalizeHeader(header)
        }))
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
   * Works with normalized headers.
   */
  public static validateAndFilterRows(rows: any[]): { valid: any[]; skippedCount: number } {
    const valid: any[] = [];
    let skippedCount = 0;

    for (const row of rows) {
      // After header normalization, keys are already lowercase snake_case
      const keys = Object.keys(row);
      const hasEmail = keys.some(key => {
        return (key.includes('email') || key.includes('mail')) && row[key] && String(row[key]).trim() !== '';
      });

      const hasPhone = keys.some(key => {
        return (key.includes('phone') || key.includes('mobile') || key.includes('contact') || key.includes('num')) && row[key] && String(row[key]).trim() !== '';
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
