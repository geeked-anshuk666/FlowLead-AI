# Testing Strategy

Guidelines for verifying execution results:

- **Unit Testing:** Focus on verifying fallback model switches in `AiService` and early-filtering logic in `CsvService`.
- **Integration Testing:** Call REST routes (`POST /api/imports/upload`) and mock Redis channel messages to prove background workers pick up tasks.
- **E2E Testing:** Playwright configurations tests uploading dummy CSV files and checking progress bar and results tables.
