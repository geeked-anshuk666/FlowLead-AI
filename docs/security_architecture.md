# Security Architecture

Security configurations implemented in the project.

- **CORS Management:** Express utilizes `cors` middleware, allowing requests only from verified domain configurations.
- **Input Sanitization:** Frontend forms and table headers are sanitized to mitigate Cross-Site Scripting (XSS).
- **SQL Injection Prevention:** Parameterized SQL generated via Prisma ORM queries prevents malicious payload injections.
- **File Upload Filter:** Max file size capped at 100MB; MIME validator checks for `text/csv` and `application/vnd.ms-excel`.
- **Secret Management:** API keys (Gemini, OpenRouter) are loaded via `dotenv` and never checked in.
