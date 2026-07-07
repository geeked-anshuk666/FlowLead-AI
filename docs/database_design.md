# Database Design

PostgreSQL schemas and optimization parameters.

## Tables

### `import_runs`
- `id`: UUID (Primary Key)
- `created_at`: TIMESTAMP
- `status`: VARCHAR
- `file_name`: VARCHAR
- `total_records`: INTEGER
- `processed_records`: INTEGER
- `skipped_records`: INTEGER

### `leads`
- `id`: UUID (Primary Key)
- `import_id`: UUID (Foreign Key references `import_runs.id` on delete cascade)
- `name`, `email`, `country_code`, `mobile_without_country_code`, `company`, `city`, `state`, `country`, `lead_owner`, `crm_status`, `crm_note`, `data_source`, `possession_time`, `description`: VARCHAR / TEXT
- `deleted_at`: TIMESTAMP (Soft Delete support)

## Indexes
- Index on `import_runs(created_at)` for quick audit histories.
- Index on `leads(email)` for unique checks.
- Index on `leads(mobile_without_country_code)` for uniqueness.
- Composite index on `leads(import_id, crm_status)` to support filter counts.
