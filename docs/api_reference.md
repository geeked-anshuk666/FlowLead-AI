# API Reference

REST endpoint contracts and payload formats for the backend importer server.

## Endpoints

### 1. Upload CSV
- **Endpoint:** `POST /api/imports/upload`
- **Payload:** `multipart/form-data` containing `file: CSV File`
- **Response:** `202 Accepted`
  ```json
  {
    "runId": "uuid-string",
    "fileName": "leads.csv",
    "totalRecords": 105,
    "validCount": 100,
    "skippedCount": 5,
    "previewRows": [...]
  }
  ```

### 2. Progress SSE Stream
- **Endpoint:** `GET /api/imports/:runId/progress`
- **Response:** `text/event-stream` updates containing progress percent and statistics.

### 3. Runs History
- **Endpoint:** `GET /api/imports/history`
- **Response:** List of import runs meta objects.
